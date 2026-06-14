import { useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./MobileMenu.css";

const MobileMenu = ({ onClose }) => {
  const { token, email, logout, openModal } = useContext(UserContext);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleOpenModal = () => {
    openModal();
    onClose();
  };

  return createPortal(
    <div className="mobile-menu-overlay" onClick={onClose}>
      <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
        <button className="mobile-menu-close" onClick={onClose} aria-label="Fermer">
          ×
        </button>
        <nav className="mobile-menu-nav">
          <NavLink to="/personnages" onClick={onClose}>PERSONNAGES</NavLink>
          <NavLink to="/comics" onClick={onClose}>COMICS</NavLink>
          <NavLink to="/favoris" onClick={onClose}>FAVORIS</NavLink>
        </nav>
        <div className="mobile-menu-auth">
          {token && (
            <span className="mobile-menu-email">{email}</span>
          )}
          {token ? (
            <button className="header-btn header-btn--logout" onClick={handleLogout}>
              Déconnexion
            </button>
          ) : (
            <button className="header-btn" onClick={handleOpenModal}>
              Connexion
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MobileMenu;
