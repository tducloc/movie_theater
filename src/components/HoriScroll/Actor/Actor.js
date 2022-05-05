import React, { useState, useEffect } from "react";
import "./Actor.scss";
export default function Actor({ actor, index }) {
  const [imgURL, setImgURL] = useState("");

  useEffect(() => {
    setImgURL(
      actor.profile_path !== null
        ? `${process.env.REACT_APP_API_IMAGE_PATH}/${actor.profile_path}`
        : "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
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
