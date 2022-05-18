import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./HeaderNavItem.scss";
export default function HeaderNavItem({ href, urlPathName,setOpenNav }) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    switch (href) {
      case "/":
        setTitle("Homepage");
        break;

      case "/search":
        setTitle("Search");
        break;

      case "/top":
        setTitle("Hot films");
        break;

      case "/type/movie":
        setTitle("Movies");
        break;

      case "/type/tv":
        setTitle("TV series");
        break;

      default:
        break;
    }
  }, [href]);

  return (
    <li className="header__nav-item" onClick={()=>setOpenNav(false)}>
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
