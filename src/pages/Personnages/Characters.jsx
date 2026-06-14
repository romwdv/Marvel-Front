import Cards from "../../components/Cards/Cards";
import Search from "../../components/Search/Search";
import "./Characters.css";

const Characters = () => {
  return (
    <main className="container">
      <h1>LES PERSONNAGES</h1>
      <Search endpoint="characters" />
      <div className="gallery">
        <Cards endpoint="characters" />
      </div>
    </main>
  );
};

export default Characters;
