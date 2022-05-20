import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./HeaderMobile.scss";
import { faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";
import HeaderNavItem from "../HeaderNavItem/HeaderNavItem";
import { tabletMobileNavItems } from "../../../config/componentVariable";
import { v4 as uuidv4 } from "uuid";
import UserNavItem from "../UserNavItem/UserNavItem";

export default function HeaderMobile({ user, userNavItems }) {
  const url = useLocation();

  const [openNav, setOpenNav] = useState(false);

  function _handleClickIconNav() {
    setOpenNav(!openNav);
  }

  function _handleClickLayout() {
    setOpenNav(false);
  }

  return (
    <div className="header__mobile">
      <div className="header__left">
        <div className="header__nav-icon" onClick={_handleClickIconNav}>
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

      <div
        className={openNav ? "header__nav header__nav--active" : "header__nav"}
      >
        {!user && (
          <div className="header__authen">
            <Link to="/login" className="btn">
              Đăng nhập
            </Link>
          </div>
        )}

        {user && (
          <ul className="user__nav-list">
            {userNavItems.map((item) => (
              <UserNavItem
                href={item.href}
                title={item.title === "Profile" ? user.displayName : item.title}
                key={uuidv4()}
              />
            ))}
          </ul>
        )}

        <ul className="header__nav-list">
          {tabletMobileNavItems.map((item) => (
            <HeaderNavItem
              href={item.href}
              urlPathName={url.pathname}
              key={uuidv4()}
              setOpenNav={setOpenNav}
              title={item.title}
            />
          ))}
        </ul>
      </div>

      <div className="header__nav-layout" onClick={_handleClickLayout}></div>
    </div>
  );
}
