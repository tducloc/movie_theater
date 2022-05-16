import React, { useEffect, useRef } from "react";
import "./TimeItem.scss";
export default function TimeItem({ content, index, activeValue, handleClick }) {
  const ref = useRef(null);
  useEffect(() => {
    if (index === activeValue) {
      handleClick(ref.current, index);
    }
  }, []);
  return (
    <li
      className={
        activeValue === index
          ? "timeBar__item timeBar__item--active"
          : "timeBar__item"
      }
      ref={ref}
      onClick={(e) => handleClick(e.target, index)}
    >
      {content}
    </li>
  );
}
