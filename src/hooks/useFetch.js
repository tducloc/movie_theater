import axios from "axios";
import { useState, useEffect } from "react";

function useFetch(url) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // let uri = `${process.env.REACT_APP_API_URL}/${mediaType}/${id}`;
    // if (mediaType === "tv") uri += `/season/${season}`;

    if (url === null) return;
    (async function fetchData() {
      try {
        const res = await axios.get(url, {
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
  }, [url]);

  return { isLoading, data, setData };
}

export default useFetch;
