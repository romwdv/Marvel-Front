import "./Profil.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import cleanTitle from "../../utils/cleanTitle";
import nameYears from "../../utils/NameYears";
import { IoStarSharp } from "react-icons/io5";
import getImg from "../../utils/getImg";
import countComics from "../../utils/countComics";
import randomNumber from "../../utils/randomNumber";
import Aptitudes from "../../components/Fiches/Aptitudes";

const Profil = () => {
  const rate = randomNumber();
  const { id } = useParams();
  const { state } = useLocation();
  const [item, setItem] = useState(state?.item || null);
  const [isLoading, setIsLoading] = useState(!state?.item);
  console.log("ide => ", id);
  useEffect(() => {
    if (state?.item) return;
    const fetchEndpoint = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/character/${id}`,
      );
      setItem(response.data);
      setIsLoading(false);
    };
    fetchEndpoint();
  }, [id]);

  if (isLoading) return <p>on load</p>;

  return (
    <main className="container">
      <div className="profil">
        <div className="head">
          <div className="head-left">
            <section className="title">
              <h1>{cleanTitle(item.name)}</h1>
              <span>{nameYears(item.name)}</span>
            </section>
            <section className="infos">
              <p className="icon-text">
                <IoStarSharp color="e10f1e" /> {rate}
              </p>
              <p>Actif</p>
              <p>
                {countComics(item.comics) > 0 && `#${countComics(item.comics)}`}
              </p>
            </section>
          </div>
          <div className="head-right">
            <img src={getImg(item, "portrait_uncanny")} alt="" />
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
              <span>{nameYears(item.name)}</span>
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
                {countComics(item.comics) > 0 && countComics(item.comics)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="comics">
        <span>03 - BIBLIOGRAPHIE</span>
        <h2>COMICS ASSOCIÉS</h2>
      </div>
    </main>
  );
};

export default Profil;
