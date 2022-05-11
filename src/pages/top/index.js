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
  // const [dayData, setDayData] = useState([]);

  // const [isLoading, setLoading] = useState(false);

  // let url = urlGenerator.getTrendingUrl("all", "day");
  // if (choice === 1) url = urlGenerator.getTrendingUrl("all", "week");

  // const { data, isLoading } = useFetch(url);

  // console.log(url);
  // useEffect(() => {
  //   let time = "day";

  //   (async function () {

  //     setLoading(true);
  //     try {
  //       let res = await axios.get(urlGenerator.getTrendingUrl("all", time), {
  //         params: {
  //           api_key: "e3c4994c36c3478ef8a84e6c07231b05",
  //         },
  //       });

  //       let resData = res.data.results.filter(
  //         (item) => item.media_type !== "people"
  //       )
  //       setDayData(resData);

  //       time = "week";

  //     } catch (e) {
  //       console.log(e);
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, []);

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
