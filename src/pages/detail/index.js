import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import HoriScroll from "../../components/HoriScroll/HoriScroll";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./index.scss";
import axios from "axios";
import Season from "../../components/Season/Season";
import Episode from "../../components/Episode/Episode";
import useScrollToTop from "../../hooks/scrollToTop";
export default function Detail() {
  useScrollToTop();

  const [detail, setDetail] = useState([]);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState([]);
  const [country, setCountry] = useState("");
  const [trailers, setTrailer] = useState([]);
  const { id, media_type, season_id } = useParams();
  const [similar, setSimilar] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  // Get similar

  function watchUriGenerate() {
    let uri = `/watch/${media_type}/${id}`;
    if (media_type === "movie") return uri;

    if (media_type === "tv") {
      if (season_id) return `${uri}?season=${season_id}&episode=1`;
      else return `${uri}?season=${1}&episode=1`;
    }
  }
  async function getSimilar() {
    const uri = `${process.env.REACT_APP_API_URL}/${media_type}/${id}/similar`;
    const res = await axios.get(uri, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    });
    const data = res.data.results;
    setSimilar(data);
  }

  // Get cast
  async function getCast() {
    const uri = `${process.env.REACT_APP_API_URL}/${media_type}/${id}/credits`;
    const res = await axios.get(uri, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    });

    const data = res.data.cast;

    if (media_type === "movie") {
      const direct = res.data.crew.find((item) => item.job === "Director");
      setDirector(direct.name);
    }
    setCast(data);
  }

  // Get film detail
  async function getDetail() {
    const uri = `${process.env.REACT_APP_API_URL}/${media_type}/${id}`;
    const res = await axios.get(uri, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    });
    const data = res.data;

    setDetail(data);
    setCountry(data.production_countries[0].iso_3166_1);
  }

  // Get film trailers
  async function getTrailer() {
    const uri = `${process.env.REACT_APP_API_URL}/${media_type}/${id}/videos`;
    const res = await axios.get(uri, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    });
    const data = res.data.results;
    setTrailer(data);
  }

  // Get all sesson episodes
  async function getEpisodes() {
    const uri = `${process.env.REACT_APP_API_URL}/${media_type}/${id}/season/${season_id}`;
    const res = await axios.get(uri, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    });
    const data = res.data.episodes;
    setEpisodes(data);
  }

  useEffect(() => {
    getCast();
    getDetail();
    getTrailer();
    if (media_type === "movie") getSimilar();
    if (media_type === "tv" && season_id) getEpisodes();
  }, [season_id, id, media_type]);

  // useEffect(() => {

  // }, [season_id]);

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

            <Link to={watchUriGenerate()} className="btn">
              <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
              XEM PHIM
            </Link>
          </div>
          <div className="detail__info-right">
            <h1>{detail.title ?? detail.name}</h1>
            <span className="certificate">TV-MA</span>
            <span className="rate">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path
                  d="M44 13H4c-2.2 0-4 1.8-4 4v16c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V17c0-2.2-1.8-4-4-4z"
                  fill="#ffc107"
                ></path>
                <path
                  d="M28.102 18h-3.704v13.102h3.704c2 0 2.796-.403 3.296-.704.602-.398.903-1.097.903-1.796v-7.903c0-.898-.403-1.699-.903-2-.796-.5-1.097-.699-3.296-.699zm.699 10.3c0 .598-.7.598-1.301.598V20c.602 0 1.3 0 1.3.602zM33.8 18v13.3h2.802s.199-.902.398-.698c.398 0 1.5.597 2.2.597.698 0 1.1 0 1.5-.199.6-.398.698-.7.698-1.3v-7.802c0-1.097-1.097-1.796-2-1.796-.898 0-1.796.597-2.199.898v-3zm3.598 4.2c0-.4 0-.598.403-.598.199 0 .398.199.398.597v6.602c0 .398 0 .597-.398.597-.2 0-.403-.199-.403-.597zM22.7 31.3V18h-4.4l-.8 6.3-1.102-6.3h-4v13.3h2.903v-7.402l1.3 7.403h2l1.297-7.403v7.403zM7.602 18h3.097v13.3H7.602z"
                  fill="#263238"
                ></path>
              </svg>
              <p>{detail.vote_average}</p>
            </span>

            <div className="btn-block">
              <div className="btn-block-left">
                <a href="#" className="btn btn--bg-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M448 80v352c0 26.5-21.5 48-48 48h-85.3V302.8h60.6l8.7-67.6h-69.3V192c0-19.6 5.4-32.9 33.5-32.9H384V98.7c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9H184v67.6h60.9V480H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48z"></path>
                  </svg>
                  <p>Chia sẻ</p>
                </a>

                <button className="btn btn--outline-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path>
                  </svg>

                  <p>Bộ sưu tập</p>
                </button>
              </div>

              <div className="btn-block-right">
                <a href="#" className="btn btn--outline-white">
                  {detail.genres ? detail.genres[0].name : "movie"}
                </a>
              </div>
            </div>

            {/* text */}
            <div className="detail__info-text">
              <div className="detail__info-basic">
                <div className="basic-info">
                  {media_type === "movie" && <p>ĐẠO DIỄN</p>}
                  {media_type === "tv" && <p>NHÀ SẢN XUẤT</p>}

                  <p>QUỐC GIA</p>
                  <p>KHỞI CHIẾU</p>
                </div>

                <div className="basic-info-data">
                  {media_type === "movie" && <a href="#">{director}</a>}
                  {media_type === "tv" && (
                    <a href="#">{detail.networks?.[0]?.name}</a>
                  )}

                  <a href="#">{country}</a>
                  <a href="#">{detail.release_date ?? detail.first_air_date}</a>
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
            {media_type === "movie" && (
              <div className="detail__info-similar">
                <HoriScroll type={"similar"} items={similar} />
              </div>
            )}

            {/* Season */}
            {media_type === "tv" && !season_id && detail.seasons && (
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
            {media_type === "tv" && season_id && episodes && (
              <div className="detail__info-episode">
                <h2>Episodes</h2>
                <Episode episodes={episodes} id={id} media_type={media_type} />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}
