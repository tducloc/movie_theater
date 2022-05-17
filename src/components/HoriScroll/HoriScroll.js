import React, { useCallback, useEffect, useRef, useState } from "react";
import "./HoriScroll.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import Actor from "./Actor/Actor";
import Trailer from "./Trailer/Trailer";
import Film from "../Film/Film";
import { isVisible } from "../../lib/library";

export default function HoriScroll({ items, type }) {
  const [lastIndex, setLastIndex] = useState(0);
  const listRef = useRef(null);
  const leftBtnRef = useRef(null);
  const rightBtnRef = useRef(null);

  const generateList = useCallback(
    function () {
      if (type === "actor" && items)
        return items.map((actor, index) => (
          <Actor key={index} actor={actor} index={index} />
        ));

      if (type === "trailer" && items)
        return items.map((trailer, index) => (
          <Trailer key={trailer.id} trailer={trailer} index={index} />
        ));

      if (type === "similar" && items)
        return items.map((movie) => (
          <li className="similar__movie" key={movie.id}>
            <Film media_type={"movie"} film={movie} />
          </li>
        ));
    },
    [items, type]
  );

  useEffect(() => {
    const list = listRef.current;
    const leftBtn = leftBtnRef.current;
    const rightBtn = rightBtnRef.current;
    const listItems = list.children;
    const maxScrollWidth = list.scrollWidth;
    const listWidth = list.clientWidth;

    //  Function
    function toRight() {
      const inVisibleItem = Array.from(listItems).find((item, index) => {
        if (!isVisible(item, list) && index > lastIndex) {
          setLastIndex(index);
          return true;
        }
        return false;
      });

      if (inVisibleItem) {
        const newOffSetLeft = inVisibleItem.offsetLeft;

        list.scroll({ behavior: "smooth", left: newOffSetLeft });

        if (newOffSetLeft >= maxScrollWidth - listWidth)
          setLastIndex(items.length);
      }
    }

    function toLeft() {
      const reverse = Array.from(listItems).reverse();
      let findIndex = -1;

      const itemsLength = items.length;
      const inVisibleItem = reverse.find((item, index) => {
        if (!isVisible(item, list) && itemsLength - 1 - index < lastIndex) {
          setLastIndex(itemsLength - 1 - index);
          return true;
        }
        return false;
      });

      if (!findIndex) {
        list.scroll({ behavior: "smooth", left: 0 });
        return;
      }

      const newOffSetLeft = inVisibleItem.offsetLeft;
      list.scroll({ behavior: "smooth", left: newOffSetLeft });
    }

    rightBtn.addEventListener("click", toRight);
    leftBtn.addEventListener("click", toLeft);

    return () => {
      rightBtn.removeEventListener("click", toRight);
      leftBtn.removeEventListener("click", toLeft);
    };
  }, [items, type, lastIndex]);

  return (
    <div className="horizontal-scroll">
      <div className="horizontal-scroll__top">
        {type === "actor" && <h3>DIỄN VIÊN</h3>}
        {type === "trailer" && <h3>TRAILERS</h3>}
        {type === "similar" && <h3>PHIM CÙNG THỂ LOẠI</h3>}

        <div className="direction-btn-block">
          <div
            className={lastIndex === 0 ? "btn-left disable" : "btn-left"}
            ref={leftBtnRef}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>

          <div
            className={
              lastIndex === items.length ? "btn-right disable" : "btn-right"
            }
            ref={rightBtnRef}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
      </div>
      <ul className="horizontal-scroll-list" ref={listRef}>
        {generateList()}
      </ul>
    </div>
  );
}
