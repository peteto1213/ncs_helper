import React from "react"
import { useSelector } from 'react-redux'

function SingleGuideComment(props) {
  const {comment} = props
  const { viewingGuide } = useSelector((state) => state.guide)
  return (
    <>
      <div className="comment">
        <img className="icon" src={`${process.env.PUBLIC_URL}/userIcons/${comment.user.icon}`} alt="" />
        <div className="text">

          <div className="headline">
            <h3 className={(comment.user._id == viewingGuide.user._id) ? "author active" : "author"}>
              {comment.user.nickname}
            </h3>
            <p className="date">{new Date(comment.createdAt).toLocaleString('en-US')}</p>
          </div>

          <p>
            {comment.content}
          </p>
        </div>
      </div>
    </>
  );
}

export default SingleGuideComment;
