import React from "react";
import "./Season.scss";
import { getYear } from "../../lib/library";
import { Link } from "react-router-dom";
export default function Season({ seasons, id, filmName }) {
  return (
    <ul className="season__list">
      {seasons &&
        seasons.map(
          (season) =>
            season.season_number !== 0 && (
              <li key={season.id} className="season__item">
                <Link
                  to={`/tv/detail/${id}/season/${season.season_number}`}
                  className="season__link"
                >
                  <div className="season__image">
                    <img
                      src={
                        season.poster_path
                          ? `${process.env.REACT_APP_API_IMAGE_PATH}/${season.poster_path}`
                          : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUpwrpCwV4v1ConOsZSO6b9F-Z28VUg09j3pX9pxXvWV_JpnPyMOYkV7zx1g-EDV10ufs&usqp=CAU`
                      }
                      alt="season-img"
                    />
                  </div>
                </Link>

                <div className="season__info">
                  <Link to={`/tv/detail/${id}/season/${season.season_number}`}>
                    Phần {season.season_number}
                  </Link>
                  <span>
                    <p>{getYear(season.air_date)}</p>
                    <p>-</p>
                    <p>{season.episode_count} tập</p>
                  </span>

                  <p>
                    Phần {season.season_number} của {filmName} được khởi chiếu
                    vào ngày {season.air_date}
                  </p>
                </div>
              </li>
            )
        )}
    </ul>
  );
}
