import "./Comic.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import cleanTitle from "../../utils/cleanTitle";
import extractYear from "../../utils/NameYears";
import { IoStarSharp } from "react-icons/io5";
import getImg from "../../utils/getImg";
import randomNumber from "../../utils/randomNumber";
import ComicsNumber from "../../utils/comicsNumber";

const Comic = () => {
  const rate = randomNumber();
  const { id } = useParams();
  const { state } = useLocation();
  const [item, setItem] = useState(state?.item || null);
  const [isLoading, setIsLoading] = useState(!state?.item);

  useEffect(() => {
    if (state?.item) return;
    const fetchEndpoint = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/comic/${id}`,
      );
      setItem(response.data);
      setIsLoading(false);
    };
    fetchEndpoint();
  }, [id]);

  if (isLoading) return <p>on load</p>;
  return (
    <main className="container">
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
              <p>Actif</p>
            </section>
          </div>
          <div className="head-right">
            <img src={getImg(item, "standard_fantastic")} alt={item.title} />
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
                {item.name !== extractYear(item.title)
                  ? extractYear(item.title)
                  : "Identitée inconnue"}
              </span>
            </div>
            <div className="fiche-info">
              <span>NUMÉRO</span>
              <span>{ComicsNumber(item.title)}</span>
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
