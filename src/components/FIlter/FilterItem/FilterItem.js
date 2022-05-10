import React, { useEffect, useRef, useState } from "react";
import "./FilterItem.scss";
export default function FilterItem({
  media_type,
  label,
  data,
  type,
  initData,
  setQuery,
  view,
  setView,
}) {
  //   console.log(data);
  const [initOption, setInitOption] = useState(initData);

  const ref = useRef(null);

  useEffect(() => {
    const viewDiv = ref.current;
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

  // console.log(initData);
  useEffect(() => {
    setInitOption(initData);
  }, [initData]);

  function handleOnChange(e) {
    // if(label === "Genres")
    setInitOption(e.target.value);
  }

  useEffect(() => {
    // if (!initOption) return;

    let query = "genre";
    switch (label) {
      case "Year":
        query = "year";
        break;
      case "Country":
        query = "country";
        break;
      case "Sort by":
        query = "sort";
        break;

      default:
        break;
    }

    setQuery((oldQuery) => {
      return { ...oldQuery, [query]: initOption };
    });
    // if (initOption) currentParams.set(query, initOption);
    // else currentParams.delete(query);
    // setParams(currentParams.key);
    // console.log("abc");
    // console.log(currentParams.entries());
  }, [initOption]);

  return (
    data && (
      <li className="filter__item">
        <label htmlFor={`${label}`}>{label}:</label>
        {type === "select" && (
          <select
            id={`${label}`}
            onChange={(e) => handleOnChange(e)}
            value={initOption ? initOption : ``}
          >
            <option value="">-- Tất cả --</option>
            {data.map((item) => {
              if (label === "Genres")
                return (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                );

              if (label === "Country")
                return (
                  <option value={item?.iso_639_1} key={item?.iso_639_1}>
                    {item.english_name}
                  </option>
                );

              if (label === "Year")
                return (
                  <option value={item} key={item}>
                    {item > 0 ? item : `Before ${-item}`}
                  </option>
                );

              if (label === "Sort by")
                return (
                  <option value={item.value} key={item.id}>
                    {item.name}
                  </option>
                );
            })}
          </select>
        )}

        {type === "view" && (
          <div className="filter__item-view " ref={ref}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className={view === 1 ? "active" : ""}
            >
              <path d="M96 96c0 26.51-21.49 48-48 48S0 122.51 0 96s21.49-48 48-48 48 21.49 48 48zM48 208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm0 160c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm96-236h352c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H144c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h352c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H144c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h352c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H144c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className={view === 2 ? "active" : ""}
            >
              <path d="M149.333 56v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zm181.334 240v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm32-240v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24zm-32 80V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm-205.334 56H24c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zm386.667-56H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm0 160H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zM181.333 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24z"></path>
            </svg>
          </div>
        )}
      </li>
    )
  );
}
