import React, { useEffect, useRef } from "react";
import "./Trailer.scss";
export default function Trailer({ trailer }) {
  const ref = useRef(null);
  useEffect(() => {
    const trailerBlock = ref.current;

    if (trailerBlock === null) return;
    const player = trailerBlock.querySelector(".player");
    const layout = player.querySelector(".layout");
    const iframe = player.querySelector("iframe");
    trailerBlock.onclick = function () {
      player.classList.add("show");
      iframe.src = `${process.env.REACT_APP_YOUTUBE_VIDEO_URL}/${trailer.key}`;
    };

    layout.onclick = function (e) {
      e.stopPropagation();
      player.classList.remove("show");
      iframe.src = "";
    };
  }, [trailer]);

  return (
    trailer.site === "YouTube" &&
    trailer.key && (
      <li className="trailer" ref={ref}>
        <>
          <img
            src={`${process.env.REACT_APP_YOUTUBE_IMAGE_URL}/${trailer.key}/mqdefault.jpg`}
            alt=""
          />

          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
            </svg>
          </div>

          <div className="player">
            <div className="layout"></div>
            <iframe
              frameBorder={0}
              allowFullScreen
              title={trailer.name}
            ></iframe>
          </div>
        </>
      </li>
    )
  );
}
