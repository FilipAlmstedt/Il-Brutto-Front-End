import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <>
      <div className="homeHero">
        <span className="heroSpan"><h1>Il brutto</h1></span>
      </div>

      <div className="homeAbout">
        <h2>Chi siamo</h2>
        <p>
        Il brutto è un ristorante a conduzione familiare. Ci concentriamo più sull'esperienza della bocca, meno sugli occhi. Dal terribile puoi trovare qualcosa di bello. Trova il lordo.
        </p>
      </div>

      <Link to="/menu">
        <div className="homeMenu">
          <h2>Il menu</h2>
        </div>
      </Link>

      <Link to="/booking">
        <div className="homeBooking">
          <h2>Book a table</h2>
        </div>
      </Link>
    </>
  );
};
