import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.scss";
export default function Search({ searchKey }) {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState(searchKey);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    if (e.target.value) navigate(`/search?q=${e.target.value}`);
  };

  return (
    <div className="search__input">
      <input
        value={inputValue ? inputValue : ""}
        type="text"
        placeholder="Nhập tên phim"
        onChange={(e) => handleInputChange(e)}
      />
    </div>
  );
}
