import React from "react";
import { Link } from "react-router-dom";
import "./UserNavItem.scss"
export default function UserNavItem({ href, title }) {
  return (
    <li className="user__nav-item">
      <Link to={href}>{title}</Link>
    </li>
  );
}
