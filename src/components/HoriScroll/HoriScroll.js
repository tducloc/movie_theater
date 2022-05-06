import React, { useEffect, useRef } from "react";
import "./HoriScroll.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import Actor from "./Actor/Actor";
import Trailer from "./Trailer/Trailer";
import Film from "../Film/Film";
import { isVisible, checkScrollBar } from "../../lib/elementLib";
export default function HoriScroll({ items, type }) {
  const list = useRef(null);
  let lastIndex = 0;

  useEffect(() => {
    const scrollList = list.current.querySelector(".horizontal-scroll-list");
    const leftBtn = list.current.querySelector(".btn-left");
    const rightBtn = list.current.querySelector(".btn-right");
    const listItems = scrollList.querySelectorAll("li");

    // console.log(checkScrollBar(scrollList));
    // if (!checkScrollBar(scrollList, "Horizontal")) {
    //   leftBtn.classList.add("disable");
    //   rightBtn.classList.add("disable");
    // }

    function toRight() {
      const maxScrollWidth = scrollList.scrollWidth;
      const listWidth = scrollList.clientWidth;
      const firstOverflowIndex = Array.from(listItems).findIndex(
        (item, index) => index > lastIndex && !isVisible(item)
      );
      console.log("Last index: ", lastIndex);

      console.log(firstOverflowIndex);

      lastIndex = firstOverflowIndex;

      if (lastIndex === -1) {
        lastIndex = listItems.length - 1;
      }
      const newOffSetLeft = listItems[lastIndex].offsetLeft;

      if (newOffSetLeft > 0) {
        leftBtn.classList.remove("disable");
      }

      scrollList.scroll({
        behavior: "smooth",
        left: newOffSetLeft,
      });

      if (newOffSetLeft >= maxScrollWidth - listWidth)
        rightBtn.classList.add("disable");
    }

    function toLeft() {
      const maxScrollWidth = scrollList.scrollWidth;
      const listWidth = scrollList.clientWidth;
      const firstOverflowIndex = Array.from(listItems).findLastIndex(
        (item, index) => index < lastIndex && !isVisible(item)
      );
      lastIndex = firstOverflowIndex;

      console.log("123");
      if (lastIndex === -1) {
        leftBtn.classList.add("disable");
      }

      const newOffSetLeft =
        lastIndex <= 0 ? 0 : listItems[firstOverflowIndex].offsetLeft;

      if (newOffSetLeft < maxScrollWidth - listWidth)
        rightBtn.classList.remove("disable");

      scrollList.scroll({
        behavior: "smooth",
        left: newOffSetLeft,
      });

      if (newOffSetLeft <= 0) {
        leftBtn.classList.add("disable");
      }
    }

    // Handle event
    rightBtn.onclick = toRight;
    leftBtn.onclick = toLeft;

    return () => {
      leftBtn.onclick = undefined;
      rightBtn.onclick = undefined;
      scrollList.scroll({
        left: 0,
      });

      leftBtn.classList.add("disable");
      rightBtn.classList.remove("disable");
    };
  }, [items, type]);

  return (
    <div className="horizontal-scroll" ref={list}>
      <div className="horizontal-scroll__top">
        {type === "actor" && <h3>DIỄN VIÊN</h3>}
        {type === "trailer" && <h3>TRAILERS</h3>}
        {type === "similar" && <h3>PHIM CÙNG THỂ LOẠI</h3>}

        <div className="direction-btn-block">
          <div className="btn-left disable">
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>

          <div className="btn-right">
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
      </div>
      <ul className="horizontal-scroll-list">
        {type === "actor" &&
          items &&
          items.map((actor, index) => (
            <Actor key={index} actor={actor} index={index} />
          ))}

        {type === "trailer" &&
          items &&
          items.map((trailer, index) => (
            <Trailer key={trailer.id} trailer={trailer} index={index} />
          ))}

        {type === "similar" &&
          items &&
          items.map((movie, index) => (
            <li className="similar__movie" key={movie.id}>
              <Film media_type={"movie"} film={movie} />
            </li>
          ))}
      </ul>
    </div>
  );
}
