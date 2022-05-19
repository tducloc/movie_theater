import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Header.scss";
import HeaderMobile from "./HeaderMobile/HeaderMobile";
import HeaderNavItem from "./HeaderNavItem/HeaderNavItem";
import { desktopNavItems } from "../../config/componentVariable";
import { v4 as uuidv4 } from "uuid";

export default function Header() {
  const url = useLocation();
  const headerRef = useRef(null);
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const header = headerRef.current;

    function _handleWindowScroll() {
      const height = header.offsetHeight;

      if (window.scrollY >= height) {
        setIsScroll(true);
        return;
      }
      if (window.scrollY <= 0) {
        setIsScroll(false);

        return;
      }
    }
    window.addEventListener("scroll", _handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", _handleWindowScroll);
    };
  }, []);

  return (
    <div
      className={isScroll ? "header header--scroll" : "header"}
      ref={headerRef}
    >
      <div className="header__pc">
        <div className="header__left">
          <Link to="/" className="header__logo">
            <img src="/assets/images/logo.png" alt="logo" />
          </Link>

          <ul className="header__nav-list">
            {desktopNavItems.map((item) => (
              <HeaderNavItem
                href={item.href}
                urlPathName={url.pathname}
                key={uuidv4()}
                title={item.title}
              />
            ))}
          </ul>
        </div>
        <div className="header__right">
          <Link to="/" className="btn">
            Đăng nhập
          </Link>
        </div>
      </div>

      <HeaderMobile />
    </div>
  );
}
