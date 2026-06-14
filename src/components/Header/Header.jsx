import("./Header.css");
import logo from "../../assets/marvel-logo.svg";
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { RxHamburgerMenu } from "react-icons/rx";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const { token, email, logout, openModal } = useContext(UserContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="logo Marvel" />
        </Link>
        <div className="full-screen">
          <nav>
            <NavLink to="/personnages">PERSONNAGES</NavLink>
            <NavLink to="/comics">COMICS</NavLink>
            <NavLink to="/favoris">FAVORIS</NavLink>
          </nav>
          <div className="header-auth">
            {token ? (
              <>
                <span className="header-email">{email}</span>
                <button
                  className="header-btn header-btn--logout"
                  onClick={logout}
                >
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
        <div className="menu-mobile">
          <RxHamburgerMenu size={38} onClick={() => setMobileMenuOpen(true)} style={{ cursor: "pointer" }} />
        </div>
      </div>
      {mobileMenuOpen && <MobileMenu onClose={() => setMobileMenuOpen(false)} />}
    </header>
  );
};

export default Header;
