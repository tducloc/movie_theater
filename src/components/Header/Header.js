import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Header.scss";
import HeaderMobile from "./HeaderMobile/HeaderMobile";
import HeaderNavItem from "./HeaderNavItem/HeaderNavItem";
import { desktopNavItems, userNavItems } from "../../config/componentVariable";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/userReducer";
import UserNavItem from "./UserNavItem/UserNavItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
export default function Header() {
  const url = useLocation();
  const headerRef = useRef(null);
  const [isScroll, setIsScroll] = useState(false);

  // const [openNav, setOpenNav] = useState(false);
  const user = useSelector(selectUser);

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
        {!user && (
          <div className="header__right">
            <Link to="/login" className="btn">
              Đăng nhập
            </Link>
          </div>
        )}

        {user && (
          <div className="user__nav">
            <h1>
              {user.displayName} <FontAwesomeIcon icon={faChevronDown} />
            </h1>

            <ul className={"user__nav-list"}>
              {userNavItems.map((item) => (
                <UserNavItem
                  href={item.href}
                  title={item.title}
                  key={uuidv4()}
                />
              ))}
            </ul>
          </div>
        )}
      </div>

      <HeaderMobile user={user} userNavItems={userNavItems} />
    </div>
  );
}
