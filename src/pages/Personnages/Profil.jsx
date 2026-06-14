import "./Profil.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import cleanTitle from "../../utils/cleanTitle";
import nameYears from "../../utils/nameYears";
import { IoStarSharp } from "react-icons/io5";
import { MdOutlineFavorite } from "react-icons/md";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import getImg from "../../utils/getImg";
import countComics from "../../utils/countComics";
import randomNumber from "../../utils/randomNumber";
import Aptitudes from "../../components/Fiches/Aptitudes";
import ProfilComics from "../../components/Cards/ProfilComics";
import Loader from "../../components/Loader/Loader";
import preloadImages from "../../utils/preloadImages";

const Profil = () => {
  const { token, favorites, addFavorite, removeFavorite, openModal } =
    useUser();
  const rate = randomNumber();
  const { id } = useParams();
  const { state } = useLocation();
  const [item, setItem] = useState(state?.item || null);
  const [isLoading, setIsLoading] = useState(true);

  const isFav = item ? favorites.some((f) => f.marvelId === item._id) : false;

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
        type: "character",
        name: item.name,
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
        : (await axios.get(`${import.meta.env.VITE_API_URL}/character/${id}`))
            .data;
      await preloadImages(getImg(data, "standard_fantastic"));
      setItem(data);
      setIsLoading(false);
    };
    fetchEndpoint();
  }, [id, state?.item]);

  if (isLoading) return <Loader label="Chargement du profil" />;

  return (
    <main className="container">
      <div className="profil">
        <div className="head">
          <div className="head-left">
            <section className="title">
              <h1>{cleanTitle(item.name)}</h1>
            </section>
            <section className="infos">
              <p className="icon-text">
                <IoStarSharp color="e10f1e" /> {rate}
              </p>
              <p>Actif</p>
              <p>
                {countComics(item.comics) > 0 && `#${countComics(item.comics)}`}
              </p>
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
          <div className="head-right">
            <img
              src={getImg(item, "standard_fantastic")}
              alt={item.name}
              className="img-profil"
            />
          </div>
        </div>
      </div>
      <div className="bio">
        <div className="bio-left">
          <div className="biographie">
            <span>01 - Dossier</span>
            <h2>BIOGRAPHIE</h2>
            <p>{item.description || "Dossier confidentiel"}</p>
          </div>
          <div className="bio-profil">
            <span>02 - Profil</span>
            <h2>APTITUDES</h2>
            <Aptitudes />
          </div>
        </div>
        <div className="bio-right">
          <div className="fiche">
            <span>FICHE SIGNALÉTIQUE</span>
            <div className="fiche-info">
              <span>IDENTITÉ</span>
              <span>
                {item.name !== nameYears(item.name)
                  ? nameYears(item.name)
                  : "Inconnue"}
              </span>
            </div>
            <div className="fiche-info">
              <span>STATUT</span>
              <span>Actif</span>
            </div>
            <div className="fiche-info">
              <span>EVALUATION</span>
              <span>{rate}/10</span>
            </div>
            <div className="fiche-info">
              <span>APPARITIONS</span>
              <span>
                {countComics(item.comics) > 0 ? countComics(item.comics) : "0"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="comics">
        <span>03 - BIBLIOGRAPHIE</span>
        <h2>COMICS ASSOCIÉS</h2>
        <div className="comics-cards">
          <ProfilComics CharacID={item._id} />
        </div>
      </div>
    </main>
  );
};

export default Profil;
