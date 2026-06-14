import "./ProfilComics.css";
import { useState, useEffect } from "react";
import cleanTitle from "../../utils/cleanTitle";
import extractYears from "../../utils/extractYears";
import axios from "axios";
import getImg from "../../utils/getImg";
import comicsNumber from "../../utils/comicsNumber";
import ancient from "../../assets/ancient.png";
import Loader from "../Loader/Loader";
import preloadImages from "../../utils/preloadImages";

const ProfilComics = ({ CharacID }) => {
  const [endpointResponse, setEndpointResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEndpoint = async () => {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/comics/${CharacID}`,
      );
      await preloadImages(
        response.data.comics.map((item) => getImg(item, "portrait_uncanny")),
      );
      setEndpointResponse(response.data);
      setIsLoading(false);
    };
    fetchEndpoint();
  }, [CharacID]);

  if (isLoading) return <Loader label="Chargement des comics" />;

  return (
    <>
      {endpointResponse.comics.length > 0 ? (
        endpointResponse.comics.map((item, index) => (
          <article
            className="comic-card"
            style={{
              backgroundImage: `url(${getImg(item, "portrait_uncanny")})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            key={index}
          >
            <div className="comic-card-center">
              <span>{comicsNumber(item.title)}</span>
              <span>{extractYears(item.title)}</span>
            </div>
            <div className="comic-card-bottom">
              <p>{cleanTitle(item.title)}</p>
            </div>
          </article>
        ))
      ) : (
        <>
          <img src={ancient} alt="ancient" className="levitation" />
          <p>Pas de commics à afficher pour ce personnage.</p>
        </>
      )}
    </>
  );
};

export default ProfilComics;
