import axios from "axios";
import React, { useState, useEffect } from "react";

function useFetchDetail(media_type, id) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    let uri = `${process.env.REACT_APP_API_URL}/${media_type}/${id}`;
    // if (media_type === "tv") uri += `/season/${season}`;

    (async function fetchData() {
      try {
        const res = await axios.get(uri, {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
          },
        });

        // console.log(res.data);
        setData(res.data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { isLoading, data };
}

export default useFetchDetail;
