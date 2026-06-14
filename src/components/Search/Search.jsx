import "./Search.css";
import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import cleanTitle from "../../utils/cleanTitle";
import getImg from "../../utils/getImg";
import imgNotFound from "../../assets/marvel.png";

const queryKeyFor = (endpoint) =>
  endpoint === "characters" ? "name" : "title";

const Search = ({ endpoint }) => {
  const queryKey = queryKeyFor(endpoint);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuery = searchParams.get(queryKey) || "";
  const [input, setInput] = useState(currentQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const term = input.trim();
    const timer = setTimeout(async () => {
      if (term !== currentQuery) {
        setSearchParams(term ? { [queryKey]: term } : {});
      }

      if (!term) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/${endpoint}`,
          { params: { [queryKey]: term, page: 1 } },
        );
        setSuggestions(response.data.results.slice(0, 5));
      } catch {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [input, endpoint, queryKey, currentQuery, setSearchParams]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const label = (item) =>
    endpoint === "characters" ? cleanTitle(item.name) : cleanTitle(item.title);

  return (
    <div className="search" ref={containerRef}>
      <input
        type="search"
        className="search-input"
        placeholder={
          endpoint === "characters"
            ? "Rechercher un personnage..."
            : "Rechercher un comic..."
        }
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="search-suggestions">
          {suggestions.map((item) => (
            <Link
              to={
                endpoint === "characters"
                  ? `/profil/${item._id}`
                  : `/comic/${item._id}`
              }
              state={item}
              key={item._id}
              className="search-suggestion-link"
              onClick={() => setShowSuggestions(false)}
            >
              <li className="search-suggestion">
                <img
                  src={getImg(item, "standard_medium")}
                  onError={(e) => {
                    e.target.src = imgNotFound;
                  }}
                  alt={label(item)}
                />
                <span>{label(item)}</span>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
