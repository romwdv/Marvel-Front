import "./Favoris.css";
import { Link } from "react-router-dom";
import { MdOutlineFavorite } from "react-icons/md";
import { useUser } from "../../context/UserContext";
import imgNotFound from "../../assets/marvel.png";
import cleanTitle from "../../utils/cleanTitle";

const NOT_FOUND =
  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";

const getFavImg = (fav) => {
  if (!fav.thumbnailPath || fav.thumbnailPath === NOT_FOUND) return imgNotFound;
  return `${fav.thumbnailPath}/standard_medium.${fav.thumbnailExt}`;
};

const FavCard = ({ fav, to, onRemove }) => (
  <Link to={to} className="card-link">
    <article>
      <div className="left">
        <img
          src={getFavImg(fav)}
          onError={(e) => {
            e.target.src = imgNotFound;
          }}
          alt={fav.name}
        />
        <div className="info">
          <div className="title">
            <h3>{cleanTitle(fav.name)}</h3>
          </div>
        </div>
      </div>
      <div
        className="favorite"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove(fav.marvelId);
        }}
      >
        <MdOutlineFavorite size={30} color="#e10f1e" />
      </div>
    </article>
  </Link>
);

const Favoris = () => {
  const { token, favorites, removeFavorite, openModal } = useUser();

  if (!token) {
    return (
      <main className="container">
        <div className="favoris-empty">
          <p className="favoris-label">FAVORIS</p>
          <h1>AGENTS DU S.H.I.E.L.D</h1>
          <p className="favoris-desc">
            Connectez-vous pour retrouver vos personnages et comics favoris.
          </p>
          <button className="favoris-cta" onClick={openModal}>
            Se connecter / S'inscrire
          </button>
        </div>
      </main>
    );
  }

  const characters = favorites.filter((f) => f.type === "character");
  const comics = favorites.filter((f) => f.type === "comic");

  if (favorites.length === 0) {
    return (
      <main className="container">
        <div className="favoris-empty">
          <h1>AUCUN FAVORI</h1>
          <p className="favoris-desc">
            Vous n'avez pas encore ajouté de personnages ou de comics à vos
            favoris.
          </p>
          <Link to="/personnages" className="favoris-cta">
            Explorer les personnages
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="favoris">
        <p className="favoris-label">FAVORIS</p>
        <h1>MA COLLECTION</h1>

        {characters.length > 0 && (
          <section className="favoris-section">
            <span>01 — MES HÉROS</span>
            <div className="favoris-list">
              {characters.map((fav) => (
                <FavCard
                  key={fav.marvelId}
                  fav={fav}
                  to={`/profil/${fav.marvelId}`}
                  onRemove={removeFavorite}
                />
              ))}
            </div>
          </section>
        )}

        {comics.length > 0 && (
          <section className="favoris-section">
            <span>02 — MA BIBLIOTHÈQUE</span>
            <div className="favoris-list">
              {comics.map((fav) => (
                <FavCard
                  key={fav.marvelId}
                  fav={fav}
                  to={`/comic/${fav.marvelId}`}
                  onRemove={removeFavorite}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default Favoris;
