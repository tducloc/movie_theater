import React from "react";
import "./FetchMoreButton.scss";
export default function FetchMoreButton({ handleFunction }) {
  return <button onClick={handleFunction}>Xem thêm</button>;
}
