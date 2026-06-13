import "./Home.css";

const Home = () => {
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
          <button className="explore">&rarr; Explorer la base</button>
          <button className="connect">Se connecter</button>
        </div>
      </div>
    </main>
  );
};

export default Home;
