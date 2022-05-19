import React, { useState, useEffect } from "react";
import "./Actor.scss";
import { errorActorImage } from "../../../config/componentVariable";
import urlGenerator from "../../../config/urlGenerator";
import { Link } from "react-router-dom";
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
      <Link to={`/actor/${actor.id}`} className="actor-img">
        <img src={imgURL} alt="logo" loading="lazy" />
      </Link>
      <h3 className="actor-real-name">
        <Link to={`/actor/${actor.id}`}>{actor.name}</Link>
      </h3>
      <p className="actor-character">{actor.character}</p>
    </li>
  );
}
