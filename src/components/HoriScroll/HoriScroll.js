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
export default function HoriScroll({ items, type }) {
  const list = useRef(null);
  let lastIndex = 0;

  useEffect(() => {
    const scrollList = list.current.querySelector(".horizontal-scroll-list");
    const leftBtn = list.current.querySelector(".btn-left");
    const rightBtn = list.current.querySelector(".btn-right");
    const items = scrollList.querySelectorAll("li");

    // Function
    function isVisible(elem) {
      if (!(elem instanceof Element))
        throw Error("DomUtil: elem is not an element.");
      const style = getComputedStyle(elem);
      if (style.display === "none") return false;
      if (style.visibility !== "visible") return false;
      if (style.opacity < 0.1) return false;
      if (
        elem.offsetWidth +
          elem.offsetHeight +
          elem.getBoundingClientRect().height +
          elem.getBoundingClientRect().width ===
        0
      ) {
        return false;
      }
      const elemCenter = {
        x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
        y: elem.getBoundingClientRect().top + elem.offsetHeight / 2,
      };
      if (elemCenter.x < 0) return false;
      if (
        elemCenter.x >
        (document.documentElement.clientWidth || window.innerWidth)
      )
        return false;
      if (elemCenter.y < 0) return false;
      if (
        elemCenter.y >
        (document.documentElement.clientHeight || window.innerHeight)
      )
        return false;
      let pointContainer = document.elementFromPoint(
        elemCenter.x,
        elemCenter.y
      );
      do {
        if (pointContainer === elem) return true;
      } while ((pointContainer = pointContainer.parentNode));
      return false;
    }

    function toRight() {
      const maxScrollWidth = scrollList.scrollWidth;
      const listWidth = scrollList.clientWidth;
      const firstOverflowIndex = Array.from(items).findIndex(
        (item, index) => index > lastIndex && !isVisible(item)
      );
      console.log("Last index: ", lastIndex);

      console.log(firstOverflowIndex);

      lastIndex = firstOverflowIndex;

      if (lastIndex === -1) {
        lastIndex = items.length - 1;
      }
      const newOffSetLeft = items[lastIndex].offsetLeft;

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
      const firstOverflowIndex = Array.from(items).findLastIndex(
        (item, index) => index < lastIndex && !isVisible(item)
      );
      lastIndex = firstOverflowIndex;

      console.log("123");
      if (lastIndex === -1) return;

      const newOffSetLeft =
        lastIndex === 0 ? 0 : items[firstOverflowIndex].offsetLeft;

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
  }, [items]);

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
