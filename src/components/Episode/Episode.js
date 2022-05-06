import React from "react";
import "./Episode.scss";
import { Link } from "react-router-dom";

export default function Episode({ episodes, media_type, id }) {
  return (
    <ul className="episode__list">
      {episodes.map((ep) => (
        <li className="episode__item" key={ep.id}>
          <Link
            className="episode__link"
            to={`/watch/${media_type}/${id}?season=${ep.season_number}&episode=${ep.episode_number}`}
          >
            <div className="episode__image">
              <img
                src={`${process.env.REACT_APP_API_IMAGE_PATH}/${ep.still_path}`}
                alt=""
              />
            </div>
          </Link>

          <div className="episode__info">
            <Link
              to={`/watch/${media_type}/${id}?season=${ep.season_number}&episode=${ep.episode_number}`}
            >
              Tập {ep.episode_number}: {ep.name}
            </Link>
            <span>Khởi chiếu: {ep.air_date}</span>

            {/* <span>Rate: {ep.vote_average}</span> */}
          </div>
        </li>
      ))}
    </ul>
  );
}
