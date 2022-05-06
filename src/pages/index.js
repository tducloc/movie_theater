import React, { useState, useEffect } from "react";

import FilmList from "../components/FilmList/FilmList.js";
import "./index.scss";
import axios from "axios";
import useScrollToTop from "../hooks/scrollToTop.js";

export default function Homepage() {
  const [popularFilms, setPopularFilms] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [latestTVSeries, setLatestTVSeries] = useState([]);

  useScrollToTop();

  const fetchPopularFilm = async () => {
    const uri = process.env.REACT_APP_API_URL + "/trending/all/week";

    const response = await axios.get(uri, {
      params: { api_key: process.env.REACT_APP_API_KEY },
    });
    const data = response.data;

    setPopularFilms(data.results.slice(0, 10));
  };

  const fetchLatestMovies = async () => {
    const uri = process.env.REACT_APP_API_URL + "/trending/movie/week";

    const response = await axios.get(uri, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    });
    const data = response.data;
    setLatestMovies(data.results.slice(0, 10));
  };

  const fetchLatestTVSeries = async () => {
    const uri = process.env.REACT_APP_API_URL + "/trending/tv/week";

    const response = await axios.get(uri, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    });
    const data = response.data;
    setLatestTVSeries(data.results.slice(0, 10));
  };

  useEffect(() => {
    fetchPopularFilm();
    fetchLatestMovies();
    fetchLatestTVSeries();
  }, []);

  return (
    <>
      <div className="container">
        {/* Hot film */}
        <section className="film__section">
          <h1>TRENDING</h1>
          <FilmList films={popularFilms} />
        </section>

        {/* New film */}
        <section className="film__section">
          <h1>LATEST MOVIES</h1>
          <FilmList films={latestMovies} media_type={"movie"} />
        </section>

        {/* New series */}
        <section className="film__section">
          <h1>LATEST TV SERIES</h1>
          <FilmList films={latestTVSeries} media_type={"tv"} />
        </section>
      </div>
    </>
  );
}
