import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.scss";
export default function Search() {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (!inputValue) {
      return;
    }

    navigate(`/search?q=${inputValue}`);
  }, [inputValue]);

  return (
    <div className="search__input">
      <input
        value={inputValue}
        type="text"
        placeholder="Nhập tên phim"
        onChange={(e) => handleInputChange(e)}
      />
    </div>
  );
}
