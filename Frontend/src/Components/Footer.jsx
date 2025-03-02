import React from "react";
import shape1 from "../assets/shape/footer-shape1.png";
import shape2 from "../assets/shape/footer-shape2.png";
import logo from "../assets/logo.png";
function Footer() {
  return (
    <footer className="footer-area">
      <div className="footer__shape1">
        <img src={shape1} alt="shape" />
      </div>
      <div className="footer__shape2">
        <img src={shape2} alt="shape" />
      </div>
      <div className="container">
        <div className="footer__wrp pt-120 pb-120">
          <div className="footer__left">
            <a className="logo dark-logo" href="/">
              <img
                alt="logo"
                loading="lazy"
                width={204}
                height={38}
                decoding="async"
                data-nimg={1}
                src={logo}
                style={{}}
              />
            </a>
          </div>
          <div className="footer__right">
            <div className="footer__item">
              <h4 className="title">Service</h4>
              <ul>
                <li>
                  <a href="/">About Us</a>
                </li>
                <li>
                  <a href="/">Our Team</a>
                </li>
                <li>
                  <a href="/">Pricing Plans</a>
                </li>
                <li>
                  <a href="/">Get In Touch</a>
                </li>
              </ul>
            </div>
            <div className="footer__item">
              <h4 className="title">Useful links</h4>
              <ul>
                <li>
                  <a href="/">Privacy &amp; Terms</a>
                </li>
                <li>
                  <a href="/">FAQ Page</a>
                </li>
                <li>
                  <a href="/">Help Center</a>
                </li>
                <li>
                  <a href="/">Contact Us</a>
                </li>
              </ul>
            </div>
            <div className="footer__item">
              <h4 className="title">Follow Us</h4>
              <ul>
                <li>
                  <a href="/">Facebook</a>
                </li>
                <li>
                  <a href="/">Instagram</a>
                </li>
                <li>
                  <a href="/">LinkedIn</a>
                </li>
                <li>
                  <a href="/">YouTube</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer__wrp-bottom pt-40 pb-50">
          <p>
            Lorem ipsum dolor sit amet, cosectetur adip Duis convallis sit amet
            purus ac&nbsp;dapibus.
          </p>
          <ul>
            <li>
              <a href="/">trayambassociates@gmail.com</a>
            </li>
            <li>
              <a href="/">0000 - 222 - 333</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom light-area">
        <div className="container">
          <div className="footer-bottom__wrp">
            <p>
              Copyright © 2024 <a href="/">trayamb associates</a> All Rights
              Reserved.
            </p>
            <div className="socials">
              <a href="/">
                <i className="fa fa-brands fa-twitter" />
              </a>
              <a href="/">
                <i className="fa fa-brands fa-instagram" />
              </a>
              <a href="/">
                <i className="fa fa-brands fa-facebook-f" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
