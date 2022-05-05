import React from "react";
import "./Episode.scss";
export default function Episode({ episodes }) {
  return (
    <ul className="episode__list">
      {episodes.map((ep) => (
        <li className="episode__item" key={ep.id}>
          <a className="episode__link" href="#">
            <div className="episode__image">
              <img
                src={`${process.env.REACT_APP_API_IMAGE_PATH}/${ep.still_path}`}
                alt=""
              />
            </div>
          </a>

          <div className="episode__info">
            <a href="#">
              Tập {ep.episode_number}: {ep.name}
            </a>
            <span>Khởi chiếu: {ep.air_date}</span>

            {/* <span>Rate: {ep.vote_average}</span> */}
          </div>
        </li>
      ))}
    </ul>
  );
}
