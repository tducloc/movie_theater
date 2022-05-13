import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";
export default function Header() {
  const url = useLocation();
  useEffect(() => {
    const header = document.querySelector(".header");
    const headerNavController = document.querySelector(".header__nav-icon");
    const headerNav = document.querySelector(".header__nav");
    const headerNavLayout = document.querySelector(".header__nav-layout");

    const headerNavLink = headerNav.querySelectorAll(".header__nav-list a");

    console.log(headerNavLink);

    // const app = document.querySelector(".App");
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

    function openNav() {
      headerNav.classList.add("header__nav--active");
    }
    function closeNav() {
      headerNav.classList.remove("header__nav--active");
    }

    headerNavController.onclick = openNav;

    headerNavLayout.onclick = closeNav;

    Array.from(headerNavLink).forEach((item, index) => {
      item.onclick = closeNav;
    });

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
              <Link
                to="/search"
                className={
                  url.pathname === "/search" ? "header__nav-link--active" : ""
                }
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <p>Tìm kiếm</p>
              </Link>
            </li>

            <li>
              <Link
                to="/top"
                className={
                  url.pathname === "/top" ? "header__nav-link--active" : ""
                }
              >
                Phim hot
              </Link>
            </li>

            <li>
              <Link
                to="/type/movie"
                className={
                  url.pathname === "/type/movie"
                    ? "header__nav-link--active"
                    : ""
                }
              >
                Phim lẻ
              </Link>
            </li>

            <li>
              <Link
                to="/type/tv"
                className={
                  url.pathname === "/type/tv" ? "header__nav-link--active" : ""
                }
              >
                Phim bộ
              </Link>
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
            <Link
              to="/"
              className={url.pathname === "/" ? "header__nav-link--active" : ""}
            >
              Trang chủ
            </Link>
          </li>

          <li>
            <Link
              to="/top"
              className={
                url.pathname === "/top" ? "header__nav-link--active" : ""
              }
            >
              Phim hot
            </Link>
          </li>
          <li>
            <Link
              to="/type/movie"
              className={
                url.pathname === "/type/movie" ? "header__nav-link--active" : ""
              }
            >
              Phim lẻ
            </Link>
          </li>
          <li>
            <Link
              to="/type/tv"
              className={
                url.pathname === "/type/tv" ? "header__nav-link--active" : ""
              }
            >
              Phim bộ
            </Link>
          </li>
        </ul>
      </div>

      <div className="header__nav-layout"></div>
    </div>
  );
}
