import "./Cards.css";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import nameYears from "../../utils/NameYears";
import cleanTitle from "../../utils/cleanTitle";
import extractYears from "../../utils/extractYears";
import axios from "axios";
import getImg from "../../utils/getImg";
import countComics from "../../utils/countComics";
import comicsNumber from "../../utils/comicsNumber";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import imgNotFound from "../../assets/marvel.png";
import Loader from "../Loader/Loader";
import preloadImages from "../../utils/preloadImages";
import { useUser } from "../../context/UserContext";

const Cards = ({ endpoint }) => {
  const { token, favorites, addFavorite, removeFavorite, openModal } = useUser();
  const [endpointResponse, setEndpointResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const isFav = (marvelId) => favorites.some((f) => f.marvelId === marvelId);

  const handleFavorite = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    if (!token) {
      openModal();
      return;
    }
    const marvelId = item._id;
    if (isFav(marvelId)) {
      removeFavorite(marvelId);
    } else {
      addFavorite({
        marvelId,
        type: endpoint === "characters" ? "character" : "comic",
        name: endpoint === "characters" ? item.name : item.title,
        thumbnailPath: item.thumbnail?.path,
        thumbnailExt: item.thumbnail?.extension,
      });
    }
  };

  const page = parseInt(searchParams.get("page") || "1", 10);
  const queryKey = endpoint === "characters" ? "name" : "title";
  const query = searchParams.get(queryKey) || "";

  const goToPage = (target) => {
    const params = { page: target };
    if (query) params[queryKey] = query;
    setSearchParams(params);
  };

  useEffect(() => {
    const fetchEndpoint = async () => {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/${endpoint}`,
        { params: query ? { page, [queryKey]: query } : { page } },
      );
      await preloadImages(
        response.data.results.map((item) => getImg(item, "standard_medium")),
      );
      setEndpointResponse(response.data);
      setIsLoading(false);
    };
    fetchEndpoint();
  }, [endpoint, page, query, queryKey]);

  if (isLoading)
    return <Loader label="Connexion à la base de données du S.H.I.E.L.D" />;

  const totalPages = Math.ceil(endpointResponse.count / endpointResponse.limit);

  const pagination = (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => goToPage(page - 1)}
        disabled={page === 1}
      >
        &laquo; Précédent
      </button>
      <span className="pagination-info">
        {page} / {totalPages}
      </span>
      <button
        className="pagination-btn"
        onClick={() => goToPage(page + 1)}
        disabled={page === totalPages}
      >
        Suivant &raquo;
      </button>
    </div>
  );

  return (
    <>
      {pagination}
      {endpointResponse.results.map((item) => (
        <Link
          to={
            endpoint === "characters"
              ? `/profil/${item._id}`
              : `/comic/${item._id}`
          }
          className="card-link"
          state={item}
          key={item._id}
        >
          <article>
            <div className="left">
              <img
                src={getImg(item, "standard_medium")}
                onError={(e) => {
                  e.target.src = imgNotFound;
                }}
                alt={endpoint === "characters" ? item.name : item.title}
              />
              <div className="info">
                <div className="title">
                  <h3>
                    {endpoint === "characters"
                      ? cleanTitle(item.name)
                      : cleanTitle(item.title)}
                  </h3>
                </div>
                <div className="subtitle">
                  <p>
                    {endpoint === "characters"
                      ? nameYears(item.name)
                      : extractYears(item.title)}
                  </p>
                  <p>
                    {endpoint === "characters" && countComics(item.comics) > 0
                      ? `/ # Apparitions : ${countComics(item.comics)}`
                      : comicsNumber(item.title, "/")}
                  </p>
                </div>
              </div>
            </div>
            <div className="favorite" onClick={(e) => handleFavorite(e, item)}>
              {isFav(item._id) ? (
                <MdOutlineFavorite size={30} color="#e10f1e" />
              ) : (
                <MdOutlineFavoriteBorder size={30} color="#fff" />
              )}
            </div>
          </article>
        </Link>
      ))}
      {pagination}
    </>
  );
};

export default Cards;
