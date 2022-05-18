import React from "react";
import Film from "../Film/Film";
import "./FilmList.scss";

export default function FilmList({ films, mediaType, view }) {
  return (
    <>
      <ul className={view === 2 ? "film-list" : "film-list--grid"}>
        {films.map((film, index) => (
          <li key={index}>
            <Film
              film={film}
              mediaType={
                mediaType
                  ? mediaType
                  : film.mediaType
                  ? film.mediaType
                  : film.media_type
              }
              view={view}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
