import React, { useEffect, useState } from "react";
import { FaRegThumbsUp, FaTag, FaUndoAlt, FaThumbsUp } from "react-icons/fa";
import SingleGuideComment from "../components/SingleGuideComment";
import SingleQuestion from "../components/SingleQuestion";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'
import { getGuideByGuideId, likeGuide, commentGuide, reset } from '../features/guide/guideSlice'
import Spinner from "../components/Spinner";

import parser from 'html-react-parser'

function SingleGuide() {
  const guideId = localStorage.getItem('viewGuideId')
  const params = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth)
  const { viewingGuide, isError, isLoading, message } = useSelector((state) => state.guide)

  const [content, setContent] = useState('')

  useEffect(() => {
    if(!user){
      navigate('/login')
    }

    dispatch(getGuideByGuideId(params.guideId))

    if(isError){
      alert(message)
    }

  }, [dispatch, user, navigate, isError, message, guideId])

  //Handle User submit comment a guide
  const handleCommentChange = (event) => {
    setContent(event.target.value)
  }

  const handleSubmitComment = () => {

    let body = {
      guideId: guideId,
      content: content
    }

    dispatch(commentGuide(body))
  }

  const navigateGuideSection = () => {
    navigate('/allGuides')
  }

  //check a user has liked a guide or not
  const checkLikedBefore = (array) => {
    for(let i = 0; i < array.length; i++){
      if(array[i]._id == user._id){
        return true
      }
    }
    return false
  }

  const [acceptLike, setAcceptLike] = useState(true)

  const handleLikeGuide = () => {
    dispatch(likeGuide(guideId))
    setAcceptLike(false)
  }

  if (isLoading) {
    return <Spinner />;
  }


  return (
    <>
      {viewingGuide ? (
        <div className="single-guide">
          <div className="content">
            <div className="top-section">
              {/* Like guide functionality */}
              <div className="like">
                {checkLikedBefore(viewingGuide.likeCount) || !acceptLike ? 
                  <>
                    <FaThumbsUp className="icon-liked" />
                    {viewingGuide.likeCount.length} You have liked this guide!
                  </>
                  :
                  <>
                    <FaRegThumbsUp onClick={handleLikeGuide} className="icon" />
                    {viewingGuide.likeCount.length} ThumbsUp
                  </>
                }
              </div>

              <div className="category">
                <FaTag className="icon" />
                {viewingGuide.subtopic.name}
              </div>
              
            </div>

            <h1 className="title">{viewingGuide.name}</h1>

            <div className="details">
              <img
                className="icon"
                src={`${process.env.PUBLIC_URL}/userIcons/${viewingGuide.user.icon}`}
                alt=""
              />
              <span className="author">{viewingGuide.user.nickname}</span>
              <span className="date">
                {new Date(viewingGuide.createdAt).toLocaleString("en-US")}
              </span>
            </div>

            <p className="text">
              {parser(viewingGuide.content)}
            </p>

            {/* Question maps here */}
            {
              viewingGuide.guideQuestions.map(element =>
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
              <form onSubmit={handleSubmitComment}>
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
              {viewingGuide.comments.length} Comment(s)
            </h3>

            <div className="comments">
              {/* Comments map here */}
              {
                viewingGuide.comments.map(comment =>
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
      ) : (
        <section>
          <div className="heading">
            <h1>Error - 404: Oops! Guide not found...</h1>
          </div>
        </section>
      )
      }
    </>
  );
}

export default SingleGuide;