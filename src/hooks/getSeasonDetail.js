import axios from "axios";
import React, { useState, useEffect } from "react";

function useFetchSeasonDetail(media_type, id, season) {
  const [isLoading, setIsLoading] = useState(true);
  const [seasonDetail, setSeasonDetail] = useState(null);

  useEffect(() => {
    let uri = `${process.env.REACT_APP_API_URL}/${media_type}/${id}`;
    if (media_type === "tv") uri += `/season/${season}`;
    if (!season) return;
    (async function fetchData() {
      try {
        const res = await axios.get(uri, {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
          },
        });

        // console.log(res.data);
        setSeasonDetail(res.data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { isLoading, seasonDetail };
}

export default useFetchSeasonDetail;
