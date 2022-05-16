import axios from "axios";
import React, { useEffect, useState } from "react";
import urlGenerator from "../../config/urlGenerator";
import useFetch from "../../hooks/useFetch";
import "./Filter.scss";
import FilterItem from "./FilterItem/FilterItem";
import { useSearchParams } from "react-router-dom";
import { year, sortBy } from "../../config/componentVariable";

export default function Filter({ media_type, view, setView }) {
  const [params, setParams] = useSearchParams();

  const [genres, setGenres] = useState([]);
  const [query, setQuery] = useState({
    genre: "",
    country: "",
    year: "",
    sort: "",
  });
  const { data: countries } = useFetch(urlGenerator.getAllCountriesUrl());

  const [firstLoading, setFirstLoading] = useState(true);

  const filterItems = [
    {
      label: "Genres",
      data: genres,
      type: "select",
      setQuery: setQuery,
      initData: params.get("genre"),
      query,
    },

    {
      label: "Country",
      data: countries
        ? [...countries].sort((a, b) =>
            a.english_name.localeCompare(b.english_name)
          )
        : "",
      type: "select",
      setQuery: setQuery,
      initData: params.get("country"),
      query,
    },

    {
      label: "Year",
      data: year,
      type: "select",
      setQuery: setQuery,
      initData: params.get("year"),
      query,
    },

    {
      label: "Sort by",
      data: sortBy,
      type: "select",
      setQuery: { setQuery },
      initData: params.get("sort"),
      query,
    },

    {
      label: "View",
      data: [0, 1],
      type: "view",
      setQuery: { setQuery },
      initData: params.get("view"),
      query,
      view,
      setView,
    },
  ];

  useEffect(() => {
    (async function () {
      const data = await fetchGenres(media_type);
      setGenres(data);
    })();

    setQuery({ genre: "", country: "", year: "", sort: "" });
  }, [media_type]);

  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);

    if (firstLoading) {
      console.log("first loading...");
      setFirstLoading(false);
      return;
    }

    for (let key in query) {
      if (currentParams.has(key)) {
        currentParams.delete(key);
      }

      if (query[key]) {
        currentParams.set(key, query[key]);
      }
    }

    setParams(currentParams);
  }, [query, setParams]);

  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);

    console.log("first init");
    let loadQuery = { ...query };
    for (let key of currentParams.keys()) {
      loadQuery = { ...loadQuery, [key]: currentParams.get(key) };
    }

    setQuery(loadQuery);
  }, []);

  async function fetchGenres(media_type) {
    const res = await axios.get(urlGenerator.getGenresUrl(media_type), {
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
            data={item.data}
            type={item.type}
            setQuery={setQuery}
            initData={item.initData}
            query={query}
            view={item?.view}
            setView={item?.setView}
          />
        ))}
      </ul>
    </div>
  );
}
