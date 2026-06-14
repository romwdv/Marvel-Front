import Cards from "../../components/Cards/Cards";
import Search from "../../components/Search/Search";

const Comics = () => {
  return (
    <main>
      <div className="container">
        <h1>LES COMICS</h1>
        <Search endpoint="comics" />
        <div className="gallery">
          <Cards endpoint="comics" />
        </div>
      </div>
    </main>
  );
};

export default Comics;
