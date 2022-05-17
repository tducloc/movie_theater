import axios from "axios";
import React, { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Search from "../../components/SearchInput/Search";
import "./index.scss";
import FilmList from "../../components/FilmList/FilmList";
import useDebouce from "../../hooks/useDebouce";
import FetchMoreButton from "../../components/FetchMoreButton/FetchMoreButton";

export default function SearchPage() {
  const [searchParam] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const searchKey = searchParam.get("q");

  const [films, totalResult, isFetch, isLoading, setFilms, setLoading] =
    useDebouce(searchKey, 1000);

  const fetchSearchMovies = useCallback(
    async function (clickPage) {
      const moviesURI = `${process.env.REACT_APP_API_URL}/search/movie`;
      const res = await axios.get(moviesURI, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          page: clickPage,
          query: searchKey.toString(),
        },
      });

      return res.data;
    },
    [searchKey]
  );

  const fetchSearchTVs = useCallback(
    async function (clickPage) {
      const moviesURI = `${process.env.REACT_APP_API_URL}/search/tv`;
      const res = await axios.get(moviesURI, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          page: clickPage,
          query: searchKey.toString(),
        },
      });

      return res.data;
    },
    [searchKey]
  );

  async function handleClick() {
    setLoading(true);

    const clickPage = currentPage + 1;

    const moviesData = await fetchSearchMovies(clickPage);
    const tvsData = await fetchSearchTVs(clickPage);

    const moviesResult = moviesData.results.map((movie) => {
      return { ...movie, media_type: "movie" };
    });

    const tvsResult = tvsData.results.map((tv) => {
      return { ...tv, media_type: "tv" };
    });

    const combineArray = moviesResult.concat(tvsResult);
    combineArray.sort((a, b) => b.popularity - a.popularity);
    const totalResult = films.concat(combineArray);

    setFilms(totalResult);
    setTimeout(() => {
      setLoading(false);
    }, 500);

    setCurrentPage(clickPage);
  }

  return (
    <div className="search ">
      <div className="container">
        <Search searchKey={searchKey} />
        {!isLoading && isFetch && films.length !== 0 && (
          <>
            <FilmList films={films} />

            {films.length < totalResult && (
              <FetchMoreButton handleFunction={handleClick} />
            )}
          </>
        )}

        {isFetch && !isLoading && films.length === 0 && (
          <h1>Không tìm thấy phim</h1>
        )}

        {isLoading && !isFetch && <h1>Loading...</h1>}

        {isLoading && isFetch && films.length && (
          <>
            <FilmList films={films} />
            <h1>Loading...</h1>
          </>
        )}
      </div>
    </div>
  );
}
