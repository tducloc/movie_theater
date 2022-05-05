import React from "react";
import "./Footer.scss";
import "../../App.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <h3>
          Phim chất lượng cao online của <a href="/">Movie Theater</a> khác gì
          so với các trang phim khác?
        </h3>

        <ul>
          <li>
            Là phim bluray (reencoded), có độ phân giải thấp nhất là Full HD
            (1080p), trong khi hầu hết các trang phim khác chỉ có tới độ phân
            giải HD (720p) là cao nhất
          </li>

          <li>
            Chất lượng cao, lượng dữ liệu trên giây (bitrate) gấp từ 5 - 10 lần
            phim online thông thường - đây là yếu tố quyết định độ nét của phim
            (thậm chí còn quan trọng hơn độ phân giải)
          </li>

          <li>
            Âm thanh 5.1 (6 channel) thay vì stereo (2 channel) như các trang
            phim khác (kể cả Youtube)
          </li>

          <li>
            Phù hợp để xem trên màn hình TV, máy tính, laptop có độ phân giải
            cao
          </li>
        </ul>

        <div>
          <a href="/">Liên hệ</a>
          <a href="/" className="btn">
            <FontAwesomeIcon icon={faFacebookSquare}></FontAwesomeIcon>
            <p>Xem phim</p>
          </a>
        </div>
      </div>
    </div>
  );
}
