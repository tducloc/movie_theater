import React from "react";
import "./Film.scss";
import { Link } from "react-router-dom";
export default function Film({ film, media_type }) {
  return (
    <Link to={`/${media_type}/detail/${film.id}`} className="film__link">
      <div className="film__img">
        <img
          src={process.env.REACT_APP_API_IMAGE_PATH + film.poster_path}
          alt="img"
        />
      </div>
      <p className="film__title">{film.title ?? film.name}</p>
    </Link>
  );
}
