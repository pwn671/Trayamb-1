import React from "react";

function Topheader() {
  return (
    <div className="header-top-area d-none d-lg-block">
      <div className="container">
        <div className="header-top__wrp ">
          <div className="header-top__socials">
            <a href="/">
              <i class="fa fa-twitter" aria-hidden="true"></i>
            </a>
            <a href="/">
              <i className="fa fa-brands fa-facebook-f"></i>
            </a>

            <a href="/">
              <i className="fa fa-brands fa-instagram"></i>
            </a>
          </div>
          <ul className="header-top__links">
            <li>
              <i class="fa fa-map-marker" aria-hidden="true"></i>
              <a href="/">121 King Street, Melbourne</a>
            </li>
            <li>
              <i class="fa fa-envelope-o" aria-hidden="true"></i>
              <a href="/">trayambassociates@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Topheader;
