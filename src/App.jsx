import("./App.css");
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Comics from "./pages/Comics/Comics";
import Characters from "./pages/Personnages/Characters";
import Profil from "./pages/Personnages/Profil";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personnages" element={<Characters />} />
        <Route path="/profil/:id" element={<Profil />} />
        <Route path="/comics" element={<Comics />} />
        <Route
          path="*"
          element={
            <main>
              <div className="container">
                Vous êtes perdu dans le Multiver !
              </div>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
