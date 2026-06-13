import "./Cards.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import nameYears from "../../utils/NameYears";
import cleanTitle from "../../utils/cleanTitle";
import extractYears from "../../utils/extractYears";
import axios from "axios";
import getImg from "../../utils/getImg";
import countComics from "../../utils/countComics";
import comicsNumber from "../../utils/comicsNumber";
import { IoStarSharp } from "react-icons/io5";
import imgNotFound from "../../assets/marvel.png";

const Cards = ({ endpoint }) => {
  const [endpointResponse, setEndpointResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEndpoint = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/${endpoint}`,
      );
      setEndpointResponse(response.data);
      setIsLoading(false);
    };
    fetchEndpoint();
  }, [endpoint]);

  if (isLoading) return <p>on load</p>;

  return (
    <>
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
            <div className="favorite">
              <IoStarSharp size={30} color="#e10f1e" />
            </div>
          </article>
        </Link>
      ))}
    </>
  );
};

export default Cards;
