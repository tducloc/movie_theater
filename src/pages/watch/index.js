import React, { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import "./index.scss";
export default function Watch() {
  const { id, media_type } = useParams();
  const [searchParams] = useSearchParams();
  const season = searchParams.get("season");
  const episode = searchParams.get("episode");

  const [streamUrl, setStreamUrl] = useState("");

  useEffect(() => {
    if (media_type === "movie")
      setStreamUrl(
        `${process.env.REACT_APP_STREAM_URL}/${media_type}?id=${id}`
      );
    else {
      setStreamUrl(
        `${process.env.REACT_APP_STREAM_URL}/${media_type}?id=${id}&s=${season}&e=${episode}`
      );
    }
  }, [id, media_type, season, episode]);

  return (
    <div className="stream">
      <div className="player">
        <iframe
          src={streamUrl}
          frameBorder="0"
          title={id}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
