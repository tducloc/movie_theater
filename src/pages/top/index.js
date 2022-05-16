import "./index.scss";

import React, { useEffect, useState } from "react";
import TimeBar from "../../components/TimeBar/TimeBar";
import axios from "axios";
import urlGenerator from "../../config/urlGenerator";
import FilmList from "../../components/FilmList/FilmList";
import useFetch from "../../hooks/useFetch";
export default function TrendingPage() {
  const [choice, setChoice] = useState(0);

  const { data: dayData, isLoading: isLoading1 } = useFetch(
    urlGenerator.getTrendingUrl("all", "day")
  );
  const { data: weekData, isLoading: isLoading2 } = useFetch(
    urlGenerator.getTrendingUrl("all", "week")
  );

  return (
    <div className="trending container">
      <h1 className="trending__title">Most popular films</h1>
      <TimeBar activeValue={choice} setChoice={setChoice} />

      {/* {isLoading && data?.results.length === 0 && <h2>Loading...</h2>}
      {!isLoading && data?.results.length !== 0 && (
        <FilmList films={data.results} />
      )} */}

      {isLoading1 &&
        isLoading2 &&
        dayData?.results.length === 0 &&
        weekData.results.length && <h2>Loading...</h2>}

      {!isLoading1 &&
        !isLoading2 &&
        dayData?.results.length !== 0 &&
        choice === 0 && <FilmList films={dayData.results} />}

      {!isLoading1 &&
        !isLoading2 &&
        weekData?.results.length !== 0 &&
        choice === 1 && <FilmList films={weekData.results} />}
    </div>
  );
}
