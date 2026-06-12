import("./Header.css");
import logo from "../../assets/marvel-logo.svg";
import { Link, NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="logo Marvel" />
        </Link>
        <nav>
          <NavLink to="/personnages">PERSONNAGES</NavLink>
          <NavLink to="/comics">COMICS</NavLink>
          <NavLink to="/profil">FAVORIS</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
