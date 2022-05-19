import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./HeaderNavItem.scss";
export default function HeaderNavItem({
  href,
  urlPathName,
  setOpenNav,
  title,
}) {
  return (
    <li
      className="header__nav-item"
      onClick={() => {
        if (setOpenNav) setOpenNav(false);
      }}
    >
      <Link
        to={href}
        className={urlPathName === href ? "header__nav-link--active" : ""}
      >
        {href === "/search" && <FontAwesomeIcon icon={faMagnifyingGlass} />}
        <p>{title}</p>
      </Link>
    </li>
  );
}
