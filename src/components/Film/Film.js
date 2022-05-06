import React from "react";
import "./Film.scss";
import { Link } from "react-router-dom";
export default function Film({ film, media_type }) {
  return (
    <Link to={`/${media_type}/detail/${film.id}`} className="film__link">
      <div className="film__img">
        <img
          src={
            film.poster_path
              ? process.env.REACT_APP_API_IMAGE_PATH + film.poster_path
              : "https://i.pinimg.com/originals/fd/2d/9f/fd2d9f4640394679d65967c13ec0de2c.jpg"
          }
          alt="img"
        />
      </div>
      <p className="film__title">{film.title ?? film.name}</p>
    </Link>
  );
}
