import Cards from "../../components/Cards/Cards";

const Comics = () => {
  return (
    <main>
      <div className="container gallery">
        <h1>LES COMICS</h1>

        <Cards endpoint="comics" />
      </div>
    </main>
  );
};

export default Comics;
