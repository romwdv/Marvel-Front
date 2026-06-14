import "./Home.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Home = () => {
  const { token, openModal } = useContext(UserContext);

  return (
    <main className="container home">
      <div className="landing">
        <div className="titre">
          <h1>L'univers Marvel, à portée de main.</h1>
          <h2>
            Des milliers de personnages. Des comics légendaires. Une seule base
            de données.
          </h2>
        </div>
        <div className="cta">
          <Link to={"/personnages"}>
            <button className="explore">&rarr; Explorer la base</button>
          </Link>
          {!token && (
            <button className="connect" onClick={openModal}>
              Se connecter
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
