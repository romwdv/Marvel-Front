import axios from "axios";
import { useState, useEffect } from "react";
function Temp() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/characters`,
      );
      setCharacters(response.data);
      setIsLoading(false);
    };
    fetchCharacter();
  }, []);

  console.log(characters);

  if (isLoading) return <p>on load</p>;

  return (
    <>
      <ul>
        {characters.results.map((hero) => {
          return <li>{hero.name}</li>;
        })}
      </ul>
    </>
  );
}

export default Temp;
