import("./Header.css");
import logo from "../../assets/marvel-logo.svg";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Header = () => {
  const { token, email, logout, openModal } = useContext(UserContext);

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="logo Marvel" />
        </Link>
        <nav>
          <NavLink to="/personnages">PERSONNAGES</NavLink>
          <NavLink to="/comics">COMICS</NavLink>
          <NavLink to="/favoris">FAVORIS</NavLink>
        </nav>
        <div className="header-auth">
          {token ? (
            <>
              <span className="header-email">{email}</span>
              <button className="header-btn header-btn--logout" onClick={logout}>
                Déconnexion
              </button>
            </>
          ) : (
            <button className="header-btn" onClick={openModal}>
              Connexion
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
