import React, { useEffect, useState } from "react";
import { FaRegThumbsUp, FaTag, FaUndoAlt, FaThumbsUp } from "react-icons/fa";
import SingleGuideComment from "../components/SingleGuideComment";
import SingleQuestion from "../components/SingleQuestion";
import { useNavigate, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'
import { getGuideByGuideId } from '../features/guide/guideSlice'

function SingleGuide() {
  const location = useLocation();
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const guideId = localStorage.getItem('viewingGuide')

  const { guide } = location.state

  const navigate = useNavigate();

  const [content, setContent] = useState('')

  //Handle User submit comment a guide
  const handleCommentChange = (event) => {
    setContent(event.target.value)
  }

  const navigateGuideSection = () => {
    navigate('/allGuides')
  }

  useEffect(() => {
    if(!user){
      navigate('/login')
    }
    dispatch(getGuideByGuideId(guideId))
  }, [dispatch, user, navigate])

  return (
    <>
      <div className="single-guide">
          <div className="content">
            <div className="top-section">
              {/* Like blog functionality */}
              <div className="like">
                <FaRegThumbsUp className="icon" />
                {guide.likeCount.length}ThumbsUp
              </div>

              <div className="category">
                <FaTag className="icon" />
                {guide.subtopic.name}
              </div>
              
            </div>

            <h1 className="title">{guide.name}</h1>

            <div className="details">
              <img
                className="icon"
                src={`${process.env.PUBLIC_URL}/userIcons/${guide.icon}`}
                alt=""
              />
              <span className="author">{guide.author}</span>
              <span className="date">
                {new Date(guide.createdAt).toLocaleString("en-US")}
              </span>
            </div>

            <p className="text">
              {guide.content}
            </p>

            {/* Question maps here */}
            {
              guide.guideQuestions.map(element =>
                <SingleQuestion
                  key = {element._id}
                  question = {element.question}
                  answer = {element.answer}
                />
              )
            }
          </div>

          <div className="comment-section">
            <div className="add-comment">
              <h3>Add a comment to this guide</h3>
              <form>
                <textarea
                  name="newComment"
                  rows="4"
                  column="50"
                  placeholder="type your comments here..."
                  value={content}
                  onChange={handleCommentChange}
                  required
                />
                <button className="btn">submit</button>
              </form>
            </div>

            <h3 className="comment-number">
              {guide.comments.length} Comment(s)
            </h3>

            <div className="comments">
              {/* Comments map here */}
              {
                guide.comments.map(comment =>
                  <SingleGuideComment comment={comment} />
                )
              }
            </div>
          </div>

          <button onClick={navigateGuideSection} className="back-btn">
            <FaUndoAlt />
            <span> return to select guides</span>
          </button>
        </div>
    </>
  );
}

export default SingleGuide;