import React, { useEffect, useState } from "react";
import { FaRegThumbsUp, FaTag, FaUndoAlt, FaThumbsUp } from "react-icons/fa";
import SingleComment from "../components/SingleComment";
import SingleQuestion from "../components/SingleQuestion";
import { useNavigate } from "react-router-dom";

function SingleGuide() {

  const navigate = useNavigate();

  const [content, setContent] = useState('')

  //Handle User submit comment a guide
  const handleCommentChange = (event) => {
    setContent(event.target.value)
  }

  const navigateGuideSection = () => {
    navigate('/allGuides')
  }

  return (
    <>
      <div className="single-guide">
          <div className="content">
            <div className="top-section">
              {/* Like blog functionality */}
              <div className="like">
                <FaRegThumbsUp className="icon" />
                ThumbsUp
              </div>

              <div className="category">
                <FaTag className="icon" />
                Version control system
              </div>
              
            </div>

            <h1 className="title">Lorem ipsum dolor sit.</h1>

            <div className="details">
              <img
                className="icon"
                src=""
                alt=""
              />
              <span className="author">Pete</span>
              <span className="date">
                09/07/2022
              </span>
            </div>

            <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam debitis beatae officiis! Possimus, libero. Blanditiis iste excepturi ipsum quos omnis officiis debitis, incidunt error possimus maiores temporibus sequi, eveniet sunt adipisci explicabo! Illum sed, saepe suscipit vero dolore nisi ipsam nam maiores impedit, aperiam ullam aliquam quia dolor itaque quis?</p>

            {/* Question maps here */}
            <SingleQuestion />
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
              0 Comment(s)
            </h3>

            <div className="comments">
              {/* Comments map here */}
              {/* <SingleComment /> */}
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