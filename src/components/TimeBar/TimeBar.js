import React, { useEffect, useRef, useState } from "react";
import "./TimeBar.scss";
import TimeItem from "./TimeItem/TimeItem";
import { timeItems } from "../../config/componentVariable";
import { v4 as uuidv4 } from "uuid";
import ActiveBar from "./ActiveBar/ActiveBar";
export default function TimeBar({ activeValue, setChoice }) {
  const ref = useRef(null);

  const [activeItemWidth, setActiveItemWidth] = useState(0);
  const [activeOffSetLeft, setActiveOffSetLeft] = useState(0);

  function updateActiveBar(offsetLeft, offsetWidth) {
    setActiveItemWidth(offsetWidth);
    setActiveOffSetLeft(offsetLeft);
  }

  function _handleWindowResize() {
    const items = ref.current.children;
    const activeChild = items[activeValue];
    if (activeChild)
      updateActiveBar(activeChild.offsetLeft, activeChild.offsetWidth);
  }

  function handleClick(element, index) {
    const activeElement = element;
    setChoice(index);
    setActiveItemWidth(activeElement.offsetWidth);
    setActiveOffSetLeft(activeElement.offsetLeft);
  }

  useEffect(() => {
    window.addEventListener("resize", _handleWindowResize);

    return () => {
      window.removeEventListener("resize", _handleWindowResize);
    };
  }, []);

  return (
    <div className="timeBar">
      <ul className="timeBar__list" ref={ref}>
        {timeItems.map((item, index) => (
          <TimeItem
            content={item.content}
            index={index}
            key={uuidv4()}
            handleClick={handleClick}
            activeValue={activeValue}
          />
        ))}
      </ul>

      <ActiveBar width={activeItemWidth} left={activeOffSetLeft} />
    </div>
  );
}
