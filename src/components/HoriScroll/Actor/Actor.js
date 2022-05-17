import React, { useState, useEffect } from "react";
import "./Actor.scss";
import { errorActorImage } from "../../../config/componentVariable";
import urlGenerator from "../../../config/urlGenerator";
export default function Actor({ actor, index }) {
  const [imgURL, setImgURL] = useState("");

  useEffect(() => {
    setImgURL(
      actor.profile_path !== null
        ? urlGenerator.getImageUrl(actor.profile_path)
        : errorActorImage
    );
  }, [actor]);

  return (
    <li className={index === 0 ? "actor-item active" : "actor-item"}>
      <a href="/" className="actor-img">
        <img src={imgURL} alt="logo" loading="lazy" />
      </a>
      <h3 className="actor-real-name">
        <a href="/">{actor.name}</a>
      </h3>
      <p className="actor-character">{actor.character}</p>
    </li>
  );
}
