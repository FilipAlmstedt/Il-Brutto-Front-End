export const MenuPage = () => {
  return (
    <>
      <div className="menuHero">
        <h1>Benvenuti nel nostro brutto,</h1>
        <h1>Il nostro fatto in casa,</h1>
        <h1>Il nostro menu inaffidabile.</h1>
        <h1>-</h1>
        <h1>La nostra bella,</h1>
        <h1>Il nostro fatto in casa,</h1>
        <h1>Il nostro menu ben eseguito</h1>
        <h1>-</h1>
        <h1>Quando abbiamo finito di litigare,</h1>
        <h1>Benvenuto nel brutto</h1>
      </div>

      <div className="menuContainer">
        <div className="menuSection">
          <h1 className="sectionHead">- ANTIPASTI -</h1>
          <div className="menuItem">
            <h3>
              Mozzarella di bufala Campana DOP{" "}
              <span className="price">230:-</span>
            </h3>
            <p>
              Från Paestum, av en liten producent, får vi den här fantastiska
              och handgjorda buffelmozzarellan.
            </p>
          </div>
          <div className="menuItem">
            <h3>
              Prosciutto Crudo di Parma <span className="price">230:-</span>
            </h3>
            <p>
              Denna exklusiva Prosciutto från Parma, naturlagrad i 24 månader
              serveras med buffelmozzarella.
            </p>
          </div>
          <div className="menuItem">
            <h3>
              Burrata DOP Pugliese <span className="price">230:-</span>
            </h3>
            <p>På en bädd av krispig sallad och confiterade pachinotomater</p>
          </div>
        </div>

        <div className="menuSection">
          <h1 className="sectionHead">- CARNI -</h1>
          <div className="menuItem">
            <h3>
              Il tentazione di papa <span className="price">380:-</span>
            </h3>
            <p>Grillad gödkalvskotlett av högsta kvalitet. Pappas favorit.</p>
          </div>
          <div className="menuItem">
            <h3>
              Quaglia <span className="price">380:-</span>
            </h3>
            <p>
              Grytstekt vaktel med sauterad karljohansvamp. Serveras med två
              knivar.
            </p>
          </div>
          <div className="menuItem">
            <h3>
              Gran Grigliata<span className="price">380:-</span>
            </h3>
            <p>Lammracks med broccoli, hemlagad salsiccia och hjortfilé.</p>
          </div>
          <div className="menuItem">
            <h3>
              Coniglio <span className="price">380:-</span>
            </h3>
            <p>
              Rosmarindoftande kaninsadel lindad i Lardo di Colonnata serverad
              på en crème av Cannellinibönor.
            </p>
          </div>
          <div className="menuItem">
            <h3>
              Porchetta e Salsiccia di Cinta Senese
              <span className="price">380:-</span>
            </h3>
            <p>Fläskstek av frigående svart gris från Siena och salsiccian.</p>
          </div>
        </div>

        <div className="menuSection">
          <h1 className="sectionHead">- I CLASSICI -</h1>
          <div className="menuItem">
            <h3>
              Ravioloni <span className="price">260:-</span>
            </h3>
            <p>
              Färsk pasta fylld med Radicchio Trevigiano, sallad och Asiago ost.
            </p>
          </div>
          <div className="menuItem">
            <h3>
              Risotto con Gamberoni<span className="price">260:-</span>
            </h3>
            <p>
              Risotto med Carnaroliris och stora röda räkor från Medelhavet.
            </p>
          </div>
          <div className="menuItem">
            <h3>
              Pappardelle al ragú<span className="price">279:-</span>
            </h3>
            <p>Pappardelle med salsicciaragú, en klassisk rätt från Toscana</p>
          </div>
        </div>

        <div className="menuSection">
          <h1 className="sectionHead">- VINO -</h1>
          <div className="menuItem">
            <h3>
              2013 Lafoa <span className="price">1 050:-</span>
            </h3>
            <p>Cabernet Sauvignon</p>
          </div>
          <div className="menuItem">
            <h3>
              2009 Lafoa <span className="price">1 200:-</span>
            </h3>
            <p>Cabernet Sauvignon</p>
          </div>
          <div className="menuItem">
            <h3>
              2018 Pinot Nero <span className="price">650:-</span>
            </h3>
            <p>Pinot Nero</p>
          </div>
          <div className="menuItem">
            <h3>
              2010 Blauburgunder DOC Selezione Mazzon{" "}
              <span className="price">1 500:-</span>
            </h3>
            <p>Pinot Nero</p>
          </div>
          <div className="menuItem">
            <h3>
              1997 Granato <span className="price">1 500:-</span>
            </h3>
            <p>Teroldego</p>
          </div>
          <div className="menuItem">
            <h3>
              2010 Carmenere <span className="price">850:-</span>
            </h3>
            <p>Carmenere</p>
          </div>
        </div>
      </div>
    </>
  );
};
