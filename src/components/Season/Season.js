import React from "react";
import "./Season.scss";
import { getYear } from "../../lib/dateFormat";
export default function Season({ seasons, id, filmName }) {
  return (
    <ul className="season__list">
      {seasons.map((season) => (
        <li key={season.id} className="season__item">
          <a
            href={`/tv/detail/${id}/season/${season.season_number}`}
            className="season__link"
          >
            <div className="season__image">
              <img
                src={`${process.env.REACT_APP_API_IMAGE_PATH}/${season.poster_path}`}
                alt="season-img"
              />
            </div>
          </a>

          <div className="season__info">
            <a href={`/tv/detail/${id}/season/${season.season_number}`}>
              Phần {season.season_number}
            </a>
            <span>
              <p>{getYear(season.air_date)}</p>
              <p>-</p>
              <p>{season.episode_count} tập</p>
            </span>

            <p>
              Phần {season.season_number} của {filmName} được khởi chiếu vào
              ngày {season.air_date}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
