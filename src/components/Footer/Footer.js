import React from "react";
import "./Footer.scss";
import "../../App.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { footerItems } from "../../config/componentVariable";
export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <h3>
          Phim chất lượng cao online của <Link to="/">Movie Theater</Link> khác
          gì so với các trang phim khác?
        </h3>

        <ul>
          {footerItems.map((item) => (
            <li>{item}</li>
          ))}
        </ul>

        <div>
          <a href="/">Liên hệ</a>
          <a href="/" className="btn">
            <FontAwesomeIcon icon={faFacebookSquare}></FontAwesomeIcon>
            <p>Xem phim</p>
          </a>
        </div>
      </div>
    </div>
  );
}
