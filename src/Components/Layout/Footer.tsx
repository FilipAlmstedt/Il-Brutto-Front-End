export const Footer = () => {
  return (
    <>
      <div className="footerContainer">
        <div className="logoContainer">IL BRUTTO</div>

        <ul className="social-media-links">
          <li>
            <a href="www.facebook.com">
              <div className="icon-facebook"></div>
            </a>
          </li>
          <li>
            <a href="www.instagram.com">
              <div className="icon-instagram"></div>
            </a>
          </li>
          <li>
            <a href="www.tripadvisor.com">
              <div className="icon-tripadvisor"></div>
            </a>
          </li>
        </ul>

        <ul className="contact-information">
          <li>
            <div className="icon-clock"> </div> tue - sat, 18:00 - late
          </li>
          <li>
            <div className="icon-pin"> </div> Italienska torget 123 <br/> 123 45
            Stockholm
          </li>
          <li>
            <div className="icon-tel"> </div> 08 123 45 67
          </li>
        </ul>

        <p> All rights reserved - IL BRUTTO ™</p>
      </div>
    </>
  );
};
