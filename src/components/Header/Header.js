import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";
export default function Header() {
  useEffect(() => {
    const header = document.querySelector(".header");

    window.onscroll = function (e) {
      const height = header.offsetHeight;

      if (window.scrollY >= height) {
        header.classList.add("header--scroll");
        return;
      }
      if (window.scrollY <= 0) {
        header.classList.remove("header--scroll");
        return;
      }
    };
  }, []);

  return (
    <div className="header">
      <div className="header__left">
        <Link to="/" className="header__logo">
          <img src="/assets/images/logo.png" alt="logo" />
        </Link>

        <ul className="header__nav">
          <li>
            <Link to="/search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <p>Tìm kiếm</p>
            </Link>
          </li>

          <li>
            <a href="/">Phim hot</a>
          </li>

          <li>
            <a href="/">Phim lẻ</a>
          </li>

          <li>
            <a href="/">Phim mới</a>
          </li>

          <li>
            <a href="/">FAQ</a>
          </li>
        </ul>
      </div>
      <div className="header__right">
        <a href="/" className="btn">
          Đăng nhập
        </a>
      </div>
    </div>
  );
}
