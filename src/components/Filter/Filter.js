import axios from "axios";
import React, { useEffect, useState } from "react";
import urlGenerator from "../../config/urlGenerator";
import useFetch from "../../hooks/useFetch";
import "./Filter.scss";
import FilterItem from "./FilterItem/FilterItem";
import { useSearchParams } from "react-router-dom";
// import { filterItems } from "../../config/componentVariable";
import { year, sortBy, filterQuery } from "../../config/componentVariable";
import ViewFilter from "./ViewFilter/ViewFilter";
export default function Filter({ mediaType, view, setView }) {
  const [params, setParams] = useSearchParams();

  const [genres, setGenres] = useState([]);
  const [query, setQuery] = useState(filterQuery);
  const { data: countries } = useFetch(urlGenerator.getAllCountriesUrl());

  // const [firstLoading, setFirstLoading] = useState(true);

  const filterItems = [
    {
      label: "Genres",
      data: genres,
      initData: params.get("genre"),
    },

    {
      label: "Country",
      data: countries
        ? [...countries].sort((a, b) =>
            a.english_name.localeCompare(b.english_name)
          )
        : "",
      initData: params.get("country"),
    },

    {
      label: "Year",
      data: year,
      initData: params.get("year"),
    },

    {
      label: "Sort by",
      data: sortBy,
      setQuery: { setQuery },
      initData: params.get("sort"),
    },
  ];

  useEffect(() => {
    fetchGenres(mediaType).then((data) => setGenres(data));
    setQuery(filterQuery);
  }, [mediaType]);

  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);
    let loadQuery = filterQuery;
    for (let key of currentParams.keys()) {
      loadQuery = { ...loadQuery, [key]: currentParams.get(key) };
    }

    setQuery(loadQuery);
  }, []);

  function handleChangeQuery(query) {
    const currentParams = new URLSearchParams(window.location.search);

    for (let key in query) {
      if (currentParams.has(key)) {
        currentParams.delete(key);
      }

      if (query[key]) {
        currentParams.set(key, query[key]);
      }
    }

    setParams(currentParams);
  }

  async function fetchGenres(mediaType) {
    const res = await axios.get(urlGenerator.getGenresUrl(mediaType), {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    });
    return res.data.genres;
  }

  return (
    <div className="filter">
      <ul className="filter__list">
        {filterItems.map((item) => (
          <FilterItem
            key={item.label}
            label={item.label}
            setQuery={setQuery}
            initData={item.initData}
            query={query}
            mediaType={mediaType}
            data={item.data}
            handleChangeQuery={handleChangeQuery}
          />
        ))}

        <ViewFilter view={view} setView={setView} />
      </ul>
    </div>
  );
}
