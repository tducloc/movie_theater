import React from "react";
import "./Similar.scss";
export default function Similar(movie) {
  return (
    <li className="similar-movie">
      <a href="/">
        <img src={movie.poster_path} alt="poster" />
        <p>{movie.title}</p>
      </a>
    </li>
  );
}
