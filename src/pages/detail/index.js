import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import HoriScroll from "../../components/HoriScroll/HoriScroll";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./index.scss";
import Season from "../../components/Season/Season";
import Episode from "../../components/Episode/Episode";
import useFetch from "../../hooks/useFetch";
import urlGenerator from "../../config/urlGenerator";
import { IMDB, Facebook, Minus } from "../../components/Svg";
export default function DetailPage() {
  const [cast, setCast] = useState([]);
  const [trailers, setTrailer] = useState([]);
  const { id, mediaType, season_id } = useParams();
  const [similar, setSimilar] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  const { data: similarFetchData } = useFetch(
    urlGenerator.getSimilarFilmUrl(mediaType, id)
  );
  const { data: detail } = useFetch(
    urlGenerator.getFilmDetailUrl(mediaType, id)
  );
  const { data: episodesFetchData } = useFetch(
    urlGenerator.getSeasonDetailUrl(mediaType, id, season_id)
  );

  const { data: trailersFetchData } = useFetch(
    urlGenerator.getTrailerOfFilmUrl(mediaType, id)
  );

  const { data: castFetchData } = useFetch(
    urlGenerator.getCastOfFilmUrl(mediaType, id)
  );

  useEffect(() => {
    if (similarFetchData !== null) setSimilar(similarFetchData.results);
    if (episodesFetchData !== null) {
      setEpisodes(episodesFetchData.episodes);
    }
    if (trailersFetchData !== null) setTrailer(trailersFetchData.results);
  }, [similarFetchData, episodesFetchData, trailersFetchData]);

  useEffect(() => {
    if (castFetchData !== null) {
      setCast(castFetchData.cast);
     
    }
  }, [castFetchData]);

  return (
    detail && (
      <div className="detail">
        <div className="detail__backdrop">
          <img
            src={
              detail.backdrop_path
                ? process.env.REACT_APP_API_IMAGE_PATH + detail.backdrop_path
                : "https://wallpaperaccess.com/full/1561985.jpg"
            }
            loading="lazy"
            alt="#"
          />
        </div>

        <div className="detail__info container">
          <div className="detail__info-left">
            <div className="detail__poster">
              <img
                src={
                  detail.poster_path
                    ? process.env.REACT_APP_API_IMAGE_PATH + detail.poster_path
                    : "https://i.pinimg.com/originals/fd/2d/9f/fd2d9f4640394679d65967c13ec0de2c.jpg"
                }
                alt="poster"
              />
            </div>

            {detail.backdrop_path && detail.poster_path && (
              <Link
                to={urlGenerator.watchFilmUrl(mediaType, id)}
                className="btn"
              >
                <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
                XEM PHIM
              </Link>
            )}

            {(!detail.backdrop_path || !detail.poster_path) && (
              <button className="btn" disable="true">
                PHIM ĐANG CẬP NHẬT
              </button>
            )}
          </div>
          <div className="detail__info-right">
            <h1>{detail.title ?? detail.name}</h1>
            <span className="certificate">TV-MA</span>
            <span className="rate">
              <IMDB />
              <p>{(+detail.vote_average).toFixed(1)}</p>
            </span>

            <div className="btn-block">
              <div className="btn-block-left">
                <a href="https://facebook.com" className="btn btn--bg-blue">
                  <Facebook />
                  <p>Chia sẻ</p>
                </a>

                <Link to="/" className="btn btn--outline-blue">
                  <Minus />

                  <p>Bộ sưu tập</p>
                </Link>
              </div>

              {detail?.genres?.length > 0 && (
                <div className="btn-block-right">
                  {detail.genres.map((genre) => (
                    <Link
                      key={genre.id}
                      to={`/type/${mediaType}?genre=${genre.id}`}
                      className="btn btn--outline-white"
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* text */}
            <div className="detail__info-text">
              <div className="detail__info-basic">
                <div className="basic-info">
                  {/* {mediaType === "movie" && <p>ĐẠO DIỄN</p>}
                  {mediaType === "tv" && <p>NHÀ SẢN XUẤT</p>} */}

                  <p>THỜI LƯỢNG</p>

                  <p>KHỞI CHIẾU</p>
                </div>

                <div className="basic-info-data">
                  {mediaType === "tv" && (
                    <p>{detail.episode_run_time} minutes / ep</p>
                  )}
                  {mediaType === "movie" && <p>{detail.runtime} minutes</p>}

                  <p>{detail.release_date ?? detail.first_air_date}</p>
                </div>
              </div>

              <div className="detail__info-story">{detail.overview}</div>
            </div>

            {/* Cast */}
            <div className="detail__info-cast">
              <HoriScroll type={"actor"} items={cast} />
            </div>

            {/* Trailer */}
            <div className="detail__info-trailer">
              <HoriScroll type={"trailer"} items={trailers} />
            </div>

            {/* Similar */}
            {mediaType === "movie" && (
              <div className="detail__info-similar">
                <HoriScroll type={"similar"} items={similar} />
              </div>
            )}

            {/* Season */}
            {mediaType === "tv" && !season_id && detail.seasons && (
              <div className="detai__info-season">
                <h2>Seasons</h2>
                <Season
                  seasons={detail.seasons}
                  id={id}
                  filmName={detail.name}
                />
              </div>
            )}

            {/* Episode */}
            {mediaType === "tv" && season_id && episodes && (
              <div className="detail__info-episode">
                <h2>Episodes</h2>
                <Episode episodes={episodes} id={id} mediaType={mediaType} />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}
