import "./Comic.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import cleanTitle from "../../utils/cleanTitle";
import extractYear from "../../utils/nameYears";
import { IoStarSharp } from "react-icons/io5";
import { MdOutlineFavorite } from "react-icons/md";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import getImg from "../../utils/getImg";
import randomNumber from "../../utils/randomNumber";
import ComicsNumber from "../../utils/comicsNumber";
import Loader from "../../components/Loader/Loader";
import preloadImages from "../../utils/preloadImages";

const Comic = () => {
  const { token, favorites, addFavorite, removeFavorite, openModal } =
    useUser();
  const rate = randomNumber();
  const { id } = useParams();
  const { state } = useLocation();
  const [item, setItem] = useState(state?.item || null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const isFav = item ? favorites.some((f) => f.marvelId === item._id) : false;

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/"); // ou une route par défaut
    }
  };

  const handleFavorite = () => {
    if (!token) {
      openModal();
      return;
    }
    if (isFav) {
      removeFavorite(item._id);
    } else {
      addFavorite({
        marvelId: item._id,
        type: "comic",
        name: item.title,
        thumbnailPath: item.thumbnail?.path,
        thumbnailExt: item.thumbnail?.extension,
      });
    }
  };

  useEffect(() => {
    const fetchEndpoint = async () => {
      setIsLoading(true);
      const data = state?.item
        ? state.item
        : (await axios.get(`${import.meta.env.VITE_API_URL}/comic/${id}`)).data;
      await preloadImages(getImg(data, "portrait_uncanny"));
      setItem(data);
      setIsLoading(false);
    };
    fetchEndpoint();
  }, [id, state?.item]);

  if (isLoading) return <Loader label="Chargement du comic" />;
  return (
    <main className="container">
      <button className="back" onClick={handleBack}>
        &#x2190; Retour
      </button>
      <div className="comic">
        <div className="head">
          <div className="head-left">
            <section className="title">
              <h1>{cleanTitle(item.title)}</h1>
            </section>
            <section className="infos">
              <p className="icon-text">
                <IoStarSharp color="e10f1e" /> {rate}
              </p>
              <p>
                {!isNaN(extractYear(item.title)) ? extractYear(item.title) : ""}
              </p>
              <p>{ComicsNumber(item.title) ? ComicsNumber(item.title) : ""} </p>
              <p
                className="icon-text"
                onClick={handleFavorite}
                style={{ cursor: "pointer" }}
              >
                {isFav ? (
                  <>
                    <MdOutlineFavorite color="#e10f1e" /> Retirer des favoris
                  </>
                ) : (
                  <>
                    <MdOutlineFavoriteBorder color="#fff" /> Ajouter aux favoris
                  </>
                )}
              </p>
            </section>
          </div>
          <div className="head-right-comics">
            <img src={getImg(item, "portrait_uncanny")} alt={item.title} />
          </div>
        </div>
      </div>
      <div className="bio">
        <div className="bio-left">
          <div className="biographie">
            <span>01 - Dossier</span>
            <h2>RÉSUMÉ</h2>
            <p>{item.description || "Dossier confidentiel"}</p>
          </div>
        </div>
        <div className="bio-right">
          <div className="fiche">
            <span>FICHE SIGNALÉTIQUE</span>
            <div className="fiche-info">
              <span>ANNÉE</span>
              <span>
                {!isNaN(extractYear(item.title))
                  ? extractYear(item.title)
                  : "-"}
              </span>
            </div>
            <div className="fiche-info">
              <span>NUMÉRO</span>
              <span>
                {ComicsNumber(item.title) ? ComicsNumber(item.title) : "-"}
              </span>
            </div>
            <div className="fiche-info">
              <span>NOTES</span>
              <span>{rate}/10</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Comic;
