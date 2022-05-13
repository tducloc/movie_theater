import React, { useEffect, useRef } from "react";
import "./TimeBar.scss";
export default function TimeBar({ activeValue, setChoice }) {
  const ref = useRef(null);

  useEffect(() => {
    const items = ref?.current.querySelectorAll(".timeBar__item");
    let active = ref?.current.querySelector(".timeBar__item--active");
    const activeBar = ref?.current.querySelector(".active-bar");

    console.log(items, active, activeBar);
    function updateActiveBar() {
      activeBar.style.left = active.offsetLeft + "px";
      activeBar.style.width = active.offsetWidth + "px";
    }

    window.addEventListener("resize", function () {
      updateActiveBar();
    });

    updateActiveBar();

    function handleClick(e, index) {
      const clickTarget = e.target;
      clickTarget.classList.add("itemBar__item--active");
      active.classList.remove("itemBar__item--active");
      setChoice(index);
      active = clickTarget;
      updateActiveBar();
    }

    Array.from(items).forEach((item, index) =>
      item.addEventListener("click", (e) => handleClick(e, index))
    );

    return () => {
      Array.from(items).forEach((item, index) =>
        item.removeEventListener("click", (e) => handleClick(e, index))
      );
      window.removeEventListener("resize", function () {
        updateActiveBar();
      });
    };
  }, []);

  return (
    <div className="timeBar" ref={ref}>
      <ul className="timeBar__list">
        <li
          className={
            activeValue === 0
              ? "timeBar__item timeBar__item--active"
              : "timeBar__item"
          }
        >
          DAY
        </li>
        <li
          className={
            activeValue === 1
              ? "timeBar__item timeBar__item--active"
              : "timeBar__item"
          }
        >
          WEEK
        </li>
      </ul>
      <div className="active-bar"></div>
    </div>
  );
}
