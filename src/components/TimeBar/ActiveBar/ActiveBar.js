import React from "react";
import "./ActiveBar.scss";
export default function ActiveBar({ width, left }) {
  return <div className="active-bar" style={{ width, left }}></div>;
}
