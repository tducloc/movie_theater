import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";
export default function Header() {
  useEffect(() => {
    const header = document.querySelector(".header");
    const headerNavController = document.querySelector(".header__nav-icon");
    const headerNav = document.querySelector(".header__nav");
    const headerNavLayout = document.querySelector(".header__nav-layout");

    const app = document.querySelector(".App");
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

    headerNavController.onclick = function (e) {
      headerNav.classList.add("header__nav--active");

      const width = headerNav.offsetWidth;
      header.style.marginLeft = width + "px";
      app.style.marginLeft = width + "px";
    };

    headerNavLayout.onclick = function (e) {
      headerNav.classList.remove("header__nav--active");
      header.style.marginLeft = 0;

      app.style.marginLeft = 0;
    };

    return () => {
      headerNavController.onclick = undefined;
      headerNavLayout.onclick = undefined;
      window.onscroll = undefined;
    };
  }, []);

  return (
    <div className="header">
      <div className="header__pc">
        <div className="header__left">
          <Link to="/" className="header__logo">
            <img src="/assets/images/logo.png" alt="logo" />
          </Link>

          <ul className="header__nav-list">
            <li>
              <Link to="/search">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <p>Tìm kiếm</p>
              </Link>
            </li>

            <li>
              <Link to="/top">Phim hot</Link>
            </li>

            <li>
              <Link to="/type/movie">Phim lẻ</Link>
            </li>

            <li>
              <Link to="/type/tv">Phim bộ</Link>
            </li>
          </ul>
        </div>
        <div className="header__right">
          <Link to="/" className="btn">
            Đăng nhập
          </Link>
        </div>
      </div>

      <div className="header__mobile">
        <div className="header__left">
          <div className="header__nav-icon">
            <FontAwesomeIcon icon={faBars} />
          </div>

          <Link to="/" className="header__logo">
            <img src="/assets/images/logo.png" alt="logo" />
          </Link>
        </div>
        <div className="header__right">
          <div className="header__search">
            <Link to="/search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <p>Tìm kiếm</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="header__nav">
        <div className="header__authen">
          <Link to="/" className="btn">
            Đăng nhập
          </Link>
        </div>
        <ul className="header__nav-list">
          <li>
            <Link to="/top">Phim hot</Link>
          </li>
          <li>
            <Link to="/type/movie">Phim lẻ</Link>
          </li>
          <li>
            <Link to="/type/tv">Phim bộ</Link>
          </li>
        </ul>
      </div>

      <div className="header__nav-layout"></div>
    </div>
  );
}
