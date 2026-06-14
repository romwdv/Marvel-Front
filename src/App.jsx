import("./App.css");
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Comics from "./pages/Comics/Comics";
import Characters from "./pages/Personnages/Characters";
import Profil from "./pages/Personnages/Profil";
import Comic from "./pages/Comics/Comic";
import { UserProvider, UserContext } from "./context/UserContext";
import AuthModal from "./components/Auth/AuthModal";
import { useContext } from "react";

function AppInner() {
  const { isModalOpen, closeModal } = useContext(UserContext);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personnages" element={<Characters />} />
        <Route path="/profil/:id" element={<Profil />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comic/:id" element={<Comic />} />
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
      {isModalOpen && <AuthModal onClose={closeModal} />}
    </BrowserRouter>
  );
}

function App() {
  return (
    <UserProvider>
      <AppInner />
    </UserProvider>
  );
}

export default App;
