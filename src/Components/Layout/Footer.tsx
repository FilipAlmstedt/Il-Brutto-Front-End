export const Footer = () => {
    return (
        <>
        <div className="footerContainer">

            <div className="logoContainer">Logo</div>

            <h1>Contact us</h1>
            <form>
                <input type="text" name="email" placeholder="email"/>
                <input type="text" name="subject" placeholder="subject"/>
                <input type="submit" value="Submit" />
            </form>

            <ul className="social-media-links">
                <li>
                    <a href="www.facebook.com"><div className="icon-facebook">Facebook</div></a>
                </li>
                <li>
                    <a href="www.instagram.com"><div className="icon-instagram">Instagram</div></a>
                </li>
                <li>
                    <a href="www.tripadvisor.com"><div className="icon-tripadvisor">Tripadvisor</div></a>
                </li>
            </ul>

            <ul className="contact-information">
                <li><span className="icon-clock"></span> tue - sat, 18:00 - late</li>
                <li><span className="icon-pin"></span> Italienska torget 123 - 123 45 Stockholm</li>
                <li><span className="icon-tel"></span> 08 123 45 67</li>
            </ul>

            <p> All rights reserved - IL BRUTTO TM</p>

        </div>
        </>
    )
}