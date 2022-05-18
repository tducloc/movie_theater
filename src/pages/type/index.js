import React, { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Filter from "../../components/Filter/Filter";
import "./index.scss";
import FilmList from "../../components/FilmList/FilmList";
import axios from "axios";
import urlGenerator from "../../config/urlGenerator";
import FetchMoreButton from "../../components/FetchMoreButton/FetchMoreButton";
export default function TypePage() {
  const { mediaType } = useParams();
  const [queryParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [page, setCurrentPage] = useState(1);
  const [fetchParams, setFetchParams] = useState({});
  const [totalResult, setTotalResult] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isFetch, setIsFetch] = useState(false);
  const [view, setView] = useState(1);

  async function handleClick() {
    setLoading(true);
    const params = { ...fetchParams, page: page + 1 };
    const res = await axios.get(urlGenerator.getDiscoverUrl(mediaType), {
      params,
    });
    setData((oldData) => [...oldData, ...res.data.results]);
    setLoading(false);
    setCurrentPage((page) => page + 1);
  }

  const fetchData = useCallback(
    async (params) => {
      setLoading(true);
      setIsFetch(false);
      const res = await axios.get(urlGenerator.getDiscoverUrl(mediaType), {
        params,
      });

      setData(res.data.results);
      setFetchParams(params);
      setTotalResult(res.data.total_results);
      setCurrentPage(1);
      setLoading(false);
      setIsFetch(true);
    },
    [mediaType]
  );

  useEffect(() => {
    const params = { api_key: process.env.REACT_APP_API_KEY, page: 1 };
    console.log(queryParams);
    for (let entry of queryParams.entries()) {
      let query = "";
      let data = entry[1];
      switch (entry[0]) {
        case "genre":
          query = "with_genres";
          break;
        case "country":
          query = "with_original_language";
          break;
        case "year":
          if (data < 0) {
            query = "primary_release_date.lte";
            data = -data;
          } else {
            query = "primary_release_year";
          }
          break;

        case "sort":
          query = "sort_by";
          break;

        default:
          break;
      }

      params[query] = data;
    }

    fetchData(params);
  }, [fetchData, queryParams]);

  return (
    <div className="type container">
      <h1 className="type__media">
        {mediaType === "tv" ? "Phim bộ" : "Phim lẻ"}
      </h1>

      <Filter mediaType={mediaType} setView={setView} view={view} />
      {isFetch && !loading && data.length > 0 && (
        <section>
          <FilmList films={data} mediaType={mediaType} view={view} />

          {data.length < totalResult && (
            <FetchMoreButton handleFunction={handleClick} />
          )}
        </section>
      )}

      {isFetch && !loading && data.length === 0 && (
        <h1 className="result">Không tìm thấy phim</h1>
      )}
      {isFetch && loading && data.length === 0 && (
        <h1 className="result">Loading...</h1>
      )}
      {isFetch && loading && data.length && (
        <section>
          <FilmList films={data} view={view} mediaType={mediaType} />
          <h1 className="result">Loading...</h1>
        </section>
      )}
    </div>
  );
}
