import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <>
      <div className="homeHero">
        <h1>Il brutto</h1>
      </div>

      <div className="homeAbout">
        <h2>About</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias,
          laudantium quibusdam distinctio esse sapiente ipsum. Vel nostrum
          facere veritatis necessitatibus beatae autem perferendis eum quaerat?
          Eaque aliquid quis mollitia doloribus temporibus suscipit odio
          voluptatum pariatur!
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
