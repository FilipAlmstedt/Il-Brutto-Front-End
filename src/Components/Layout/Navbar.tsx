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
                  <b>
                    <p>IL BRUTTO</p>
                  </b>
                </div>
              </Link>
            </li>
            <div className="navbarLinks">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/menu">Menu</Link>
              </li>
              <li>
                <Link to="/booking">Booking</Link>
              </li>
            </div>
          </ul>
        </nav>
      </div>
    </>
  );
};
