import Cards from "../../components/Cards/Cards";
import "./Characters.css";

const Characters = () => {
  return (
    <main className="container">
      <h1>LES PERSONNAGES</h1>
      <div className="gallery">
        <Cards endpoint="characters" />
      </div>
    </main>
  );
};

export default Characters;
