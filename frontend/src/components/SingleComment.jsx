import React from "react";

function SingComment(props) {
  const {comment} = props
  return (
    <>
      <div className="comment">
        <img className="icon" src={`${process.env.PUBLIC_URL}/userIcons/${comment.user.icon}`} alt="" />
        <div className="text">
          <h3 className="author">
            {comment.user.nickname} <span>{new Date(comment.createdAt).toLocaleString('en-US')}</span>
          </h3>

          <p>
            {comment.content}
          </p>
        </div>
      </div>
    </>
  );
}

export default SingComment;
