import Cards from "../../components/Cards/Cards";
import Search from "../../components/Search/Search";

const Comics = () => {
  return (
    <main>
      <div className="container">
        <h1>LES COMICS</h1>
        <div className="gallery">
          <Search endpoint="comics" />
          <Cards endpoint="comics" />
        </div>
      </div>
    </main>
  );
};

export default Comics;
