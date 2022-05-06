import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Search from "../../components/SearchInput/Search";
import "./index.scss";
import FilmList from "../../components/FilmList/FilmList";

export default function SearchPage() {
  const [searchParam] = useSearchParams();
  const [films, setFilms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResult, setTotalResult] = useState(0);
  const searchKey = searchParam.get("q");
  const [loading, setLoading] = useState(false);

  async function fetchSearchMovies() {
    const moviesURI = `${process.env.REACT_APP_API_URL}/search/movie`;
    const res = await axios.get(moviesURI, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        page: currentPage,
        query: searchKey.toString(),
      },
    });

    return res.data;
  }

  async function fetchSearchTVs() {
    const moviesURI = `${process.env.REACT_APP_API_URL}/search/tv`;
    const res = await axios.get(moviesURI, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        page: currentPage,
        query: searchKey.toString(),
      },
    });

    return res.data;
  }

  function addItems(...newArray) {
    const passArray = newArray.flat();
    passArray.sort((a, b) => b.popularity - a.popularity);
    const newList = [...films, ...passArray];

    setFilms(() => {
      return newList;
    });
  }

  function replaceArray(...newArray) {
    const newList = newArray.flat();
    // console.log(newList);
    newList.sort((a, b) => b.popularity - a.popularity);
    setFilms(() => {
      return newList;
    });
  }

  //   scroll page
  useEffect(() => {
    if (!searchKey || currentPage === 1) return;

    console.log(currentPage);
    setLoading(true);
    (async function () {
      const moviesData = await fetchSearchMovies();
      const tvsData = await fetchSearchTVs();

      const moviesResult = moviesData.results.map((movie) => {
        return { ...movie, media_type: "movie" };
      });

      const tvsResult = tvsData.results.map((tv) => {
        return { ...tv, media_type: "tv" };
      });

      console.log(moviesResult);
      addItems([...moviesResult, ...tvsResult]);
      //   setTotalResult(moviesData.total_pages + tvsData.total_pages);
    })();

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [currentPage]);

  //   Change search key
  useEffect(() => {
    if (!searchKey) return;

    setLoading(true);

    (async function () {
      const moviesData = await fetchSearchMovies();
      const tvsData = await fetchSearchTVs();

      const moviesResult = moviesData.results.map((movie) => {
        return { ...movie, media_type: "movie" };
      });

      const tvsResult = tvsData.results.map((tv) => {
        return { ...tv, media_type: "tv" };
      });

      replaceArray([...moviesResult, ...tvsResult]);
      setTotalResult(moviesData.total_pages + tvsData.total_pages);
    })();

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [searchKey]);

  function handleClick() {
    setCurrentPage((page) => page + 1);
  }
  return (
    <div className="search ">
      <div className="container">
        <Search searchKey={searchKey} />
        {!loading && films.length != 0 && (
          <>
            <FilmList films={films} />

            {films.length < totalResult && (
              <button onClick={handleClick}>Xem thêm</button>
            )}
          </>
        )}

        {!loading && films.length === 0 && <h1>Không tìm thấy phim</h1>}

        {loading && films.length === 0 && <h1>Loading...</h1>}

        {loading && films.length && (
          <>
            <FilmList films={films} />
            <h1>Loading...</h1>
          </>
        )}
      </div>
    </div>
  );
}
