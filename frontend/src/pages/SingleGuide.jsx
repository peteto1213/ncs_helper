import React, { useEffect, useState } from "react";
import { FaRegThumbsUp, FaTag, FaUndoAlt, FaThumbsUp } from "react-icons/fa";
import SingleGuideComment from "../components/SingleGuideComment";
import SingleQuestion from "../components/SingleQuestion";
import { useNavigate, useLocation } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'
import { getGuideByGuideId } from '../features/guide/guideSlice'

import { useSelector, useDispatch } from 'react-redux'
import { getGuideByGuideId, likeGuide, commentGuide, reset } from '../features/guide/guideSlice'
import Spinner from "../components/Spinner";

import parser from 'html-react-parser'

function SingleGuide() {
<<<<<<< HEAD
  const guideId = localStorage.getItem('viewGuideId')
=======
  const location = useLocation();
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const guideId = localStorage.getItem('viewingGuide')

  const { guide } = location.state
>>>>>>> 34999f37f6f05e41191d4a43900dc63ba2363502

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth)
  const { viewingGuide, isError, isLoading, message } = useSelector((state) => state.guide)

  const [content, setContent] = useState('')

  useEffect(() => {
    if(!user){
      navigate('/login')
    }

    dispatch(getGuideByGuideId(guideId))

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

<<<<<<< HEAD
  //check a user has liked a blog or not
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

  console.log(viewingGuide);
=======
  useEffect(() => {
    if(!user){
      navigate('/login')
    }
    dispatch(getGuideByGuideId(guideId))
  }, [dispatch, user, navigate])
>>>>>>> 34999f37f6f05e41191d4a43900dc63ba2363502

  return (
    <>
      {viewingGuide ? (
        <div className="single-guide">
          <div className="content">
            <div className="top-section">
              {/* Like blog functionality */}
              <div className="like">
<<<<<<< HEAD
                {checkLikedBefore(viewingGuide.likeCount) || !acceptLike ? 
                  <>
                    <FaThumbsUp className="icon-liked" />
                    {viewingGuide.likeCount.length} You have liked this blog!
                  </>
                  :
                  <>
                    <FaRegThumbsUp onClick={handleLikeGuide} className="icon" />
                    {viewingGuide.likeCount.length} ThumbsUp
                  </>
                }
=======
                <FaRegThumbsUp className="icon" />
                {guide.likeCount.length}ThumbsUp
>>>>>>> 34999f37f6f05e41191d4a43900dc63ba2363502
              </div>

              <div className="category">
                <FaTag className="icon" />
<<<<<<< HEAD
                {viewingGuide.subtopic.name}
=======
                {guide.subtopic.name}
>>>>>>> 34999f37f6f05e41191d4a43900dc63ba2363502
              </div>
              
            </div>

<<<<<<< HEAD
            <h1 className="title">{viewingGuide.name}</h1>
=======
            <h1 className="title">{guide.name}</h1>
>>>>>>> 34999f37f6f05e41191d4a43900dc63ba2363502

            <div className="details">
              <img
                className="icon"
<<<<<<< HEAD
                src={`${process.env.PUBLIC_URL}/userIcons/${viewingGuide.user.icon}`}
                alt=""
              />
              <span className="author">{viewingGuide.user.nickname}</span>
              <span className="date">
                {new Date(viewingGuide.createdAt).toLocaleString("en-US")}
=======
                src={`${process.env.PUBLIC_URL}/userIcons/${guide.icon}`}
                alt=""
              />
              <span className="author">{guide.author}</span>
              <span className="date">
                {new Date(guide.createdAt).toLocaleString("en-US")}
>>>>>>> 34999f37f6f05e41191d4a43900dc63ba2363502
              </span>
            </div>

            <p className="text">
<<<<<<< HEAD
              {parser(viewingGuide.content)}
=======
              {guide.content}
>>>>>>> 34999f37f6f05e41191d4a43900dc63ba2363502
            </p>

            {/* Question maps here */}
            {
<<<<<<< HEAD
              viewingGuide.guideQuestions.map(element =>
=======
              guide.guideQuestions.map(element =>
>>>>>>> 34999f37f6f05e41191d4a43900dc63ba2363502
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
<<<<<<< HEAD
              {viewingGuide.comments.length} Comment(s)
=======
              {guide.comments.length} Comment(s)
>>>>>>> 34999f37f6f05e41191d4a43900dc63ba2363502
            </h3>

            <div className="comments">
              {/* Comments map here */}
              {
<<<<<<< HEAD
                viewingGuide.comments.map(comment =>
=======
                guide.comments.map(comment =>
>>>>>>> 34999f37f6f05e41191d4a43900dc63ba2363502
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
            <h1>Error - 404: Oops! Blog not found...</h1>
          </div>
        </section>
      )
      }
    </>
  );
}

export default SingleGuide;