import Cards from "../../components/Cards/Cards";

const Comics = () => {
  return (
    <main>
      <div className="container gallery">
        <Cards endpoint="comics" />
      </div>
    </main>
  );
};

export default Comics;
