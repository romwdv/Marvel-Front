import "./Footer.css";
import { FaSquareGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-info">
          <section className="footer-name">
            <p>Réalisé par Romain</p>
          </section>
          <section className="footer-link">
            <Link to="https://github.com/romwdv">
              <FaSquareGithub size={30} />
            </Link>
            <Link to="https://www.linkedin.com/in/romain-guyot-934327227/">
              <FaLinkedin size={30} />
            </Link>
          </section>
        </div>
        <section className="footer-sub">
          <p>Projet réalisé dans le cadre d'une formation React</p>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
