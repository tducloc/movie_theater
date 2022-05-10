import axios from "axios";
import React, { useEffect, useState } from "react";
import urlGenerator from "../../config/urlGenerator";
import useFetch from "../../hooks/useFetch";
import "./Filter.scss";
import FilterItem from "./FilterItem/FilterItem";
import { useSearchParams } from "react-router-dom";

export default function Filter({ media_type, view, setView }) {
  //   const [filterList, setFilterList] = useState([]);

  const [params, setParams] = useSearchParams();

  const [genres, setGenres] = useState([]);
  const [query, setQuery] = useState({
    genre: "",
    country: "",
    year: "",
    sort: "",
  });

  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);
    const isFirstTimeLoad = Object.keys(query).every((key) => !query[key]);

    if (isFirstTimeLoad) return;
    for (let key in query) {
      if (currentParams.has(key)) {
        currentParams.delete(key);
      }

      if (query[key]) {
        currentParams.set(key, query[key]);
        // } else {
        //   if (currentParams.has(key)) {
        //     currentParams.delete(key);
        //   }
        // }
      }
    }

    setParams(currentParams);
  }, [query]);

  const year = (function () {
    const arr = [];
    const now = new Date();
    let startYear = now.getFullYear();

    for (let i = 0; i < 8; i++) {
      const prevYear = startYear--;
      arr.push(prevYear);
    }
    arr.push(startYear);

    arr.push(-startYear);
    return arr;
  })();
  const { data: countries } = useFetch(urlGenerator.getAllCountriesUrl());
  const sortBy = [
    {
      id: "popularity_desc",
      name: "Popularity giảm dần",
      value: "popularity.desc",
    },
    {
      id: "popularity_asc",
      name: "Popularity tăng dần",
      value: "popularity.asc",
    },

    {
      id: "releaseDate_desc",
      name: "Release date giảm dần",
      value: "release_date.desc",
    },
    {
      id: "releaseDate_asc",
      name: "Release date tăng dần",
      value: "release_date.asc",
    },

    { id: "vote_desc", name: "Vote giảm dần", value: "vote_average.desc" },
    { id: "vote_asc", name: "Vote tăng dần", value: "vote_average.asc" },
  ];

  async function fetchGenres(media_type) {
    const res = await axios.get(urlGenerator.getGenresUrl(media_type), {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    });
    return res.data.genres;
  }
  useEffect(() => {
    (async function () {
      const data = await fetchGenres(media_type);
      setGenres(data);
    })();
  }, [media_type]);

  return (
    <div className="filter">
      <ul className="filter__list">
        <FilterItem
          label={"Genres"}
          data={genres}
          type="select"
          setQuery={setQuery}
          initData={params.get("genre")}
        />
        <FilterItem
          label={"Country"}
          data={countries}
          type="select"
          setQuery={setQuery}
          initData={params.get("country")}
        />
        <FilterItem
          label={"Year"}
          data={year}
          type="select"
          setQuery={setQuery}
          initData={params.get("year")}
        />
        <FilterItem
          label={"Sort by"}
          data={sortBy}
          type="select"
          setQuery={setQuery}
          initData={params.get("sort")}
        />
        <FilterItem
          label={"View"}
          type="view"
          data={[0, 1]}
          setQuery={setQuery}
          initData={params.get("view")}
          view={view}
          setView={setView}
        />
      </ul>
    </div>
  );
}
