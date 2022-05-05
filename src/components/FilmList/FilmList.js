import React from "react";
import Film from "../Film/Film";
import "./FilmList.scss";

export default function FilmList({ films, media_type }) {
  return (
    <>
      <ul className="film-list">
        {films.map((film, index) => (
          <li key={index}>
            <Film
              film={film}
              media_type={media_type ? media_type : film.media_type}
            />
          </li>
        ))}
      </ul>
    </>
  );
}