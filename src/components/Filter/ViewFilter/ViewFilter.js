import React, { useRef, useEffect } from "react";
import { BlockList, GridList } from "../../Svg";
export default function ViewFilter({ view, setView }) {
  const viewRef = useRef(null);
  useEffect(() => {
    const viewDiv = viewRef.current;
    const viewOptions = viewDiv?.querySelectorAll("svg");

    if (viewOptions)
      Array.from(viewOptions).forEach((option, index) => {
        option.addEventListener("click", () => setView(index + 1));
      });

    return () => {
      if (viewOptions)
        Array.from(viewOptions).forEach((option, index) => {
          option.removeEventListener("click", () => setView(index + 1));
        });
    };
  });

  return (
    <li className="filter__item">
      <label>View:</label>

      <div className="filter__item-view " ref={viewRef}>
        <BlockList view={view} />

        <GridList view={view} />
      </div>
    </li>
  );
}
