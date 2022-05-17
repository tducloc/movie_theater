import axios from "axios";
import React, { useEffect, useState } from "react";
import urlGenerator from "../config/urlGenerator";

export default function useDebouce(searchKey, delay) {
  const [data, setData] = useState([]);
  const [totalResult, setTotalResult] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isFetch, setIsFetch] = useState(false);
  function replaceArray(...newArray) {
    const newList = newArray.flat();
    newList.sort((a, b) => b.popularity - a.popularity);
    setData(() => {
      return newList;
    });
  }

  useEffect(() => {
    if (!searchKey) return;

    const debounce = setTimeout(async () => {
      setIsFetch(false);

      setIsLoading(true);
      const movieSearchUrl = urlGenerator.getSearchFilmUrl("movie");
      const tvSearchUrl = urlGenerator.getSearchFilmUrl("tv");
      const movieRes = await axios.get(movieSearchUrl, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          page: 1,
          query: searchKey.toString(),
        },
      });

      const tvRes = await axios.get(tvSearchUrl, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          page: 1,
          query: searchKey.toString(),
        },
      });

      const moviesResult = movieRes.data.results.map((movie) => {
        return { ...movie, media_type: "movie" };
      });

      const tvsResult = tvRes.data.results.map((tv) => {
        return { ...tv, media_type: "tv" };
      });

      replaceArray([...moviesResult, ...tvsResult]);
      setTotalResult(movieRes.data.total_pages + tvRes.data.total_pages);

      setTimeout(() => {
        setIsFetch(true);
        setIsLoading(false);
      }, 1000);
    }, delay);

    return () => {
      clearTimeout(debounce);
    };
  }, [searchKey]);

  return [data, totalResult, isFetch, isLoading, setData, setIsLoading];
}
