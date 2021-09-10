import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <div className="navbarContainer">
        <nav>
          <ul className="navbarUl">
            <li>
              <Link to="/">
                <div className="logoContainer">
                    IL BRUTTO
                </div>
              </Link>
            </li>
            <div className="navbarLinks">
              <li>
                <Link to="/">Hem</Link>
              </li>
              <li>
                <Link to="/menu">Meny</Link>
              </li>
              <li>
                <Link to="/booking">Boka bord</Link>
              </li>
            </div>
          </ul>
        </nav>
      </div>
    </>
  );
};
