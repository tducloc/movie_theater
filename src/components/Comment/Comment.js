import React from "react";
import { formatTime } from "../../lib/library";
import "./Comment.scss";
export default function Comment({ comment }) {
  return (
    <li className="comment__item">
      <div className="comment__item-profile">
        <img src={comment.user.photoUrl} alt="" />
      </div>

      <div className="comment__item-info">
        <h3 className="comment__item-username">{comment.user.displayName}</h3>
        <p className="comment__item-time">{formatTime(comment.createdAt)}</p>
        <p className="comment__item-content">{comment.content}</p>
      </div>
    </li>
  );
}
