import Cards from "../../components/Cards/Cards";
import "./Personnages.css";

const Personnages = () => {
  return (
    <main>
      <div className="container gallery">
        <Cards endpoint="characters" />
      </div>
    </main>
  );
};

export default Personnages;
