import React, { useEffect, useState } from "react";
import { FaRegThumbsUp, FaTag, FaThumbsUp, FaUndoAlt } from "react-icons/fa";
import SingleComment from "../components/SingleComment";
import { useDispatch, useSelector } from "react-redux";
import { getBlogByBlogId, likeBlog, commentBlog, reset } from "../features/blog/blogSlice";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";

import parser from 'html-react-parser'

function SingleBlog() {
  const blogId = localStorage.getItem("viewBlogId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { viewingBlog, isError, isLoading, message } = useSelector(
    (state) => state.blog
  );
  const { user } = useSelector((state) => state.auth);

  const [content, setContent] = useState('')

  useEffect(() => {
    dispatch(getBlogByBlogId(params.blogId));
    if (!user) {
      alert("You need to login to view this page!");
      navigate("/login");
    }
    if (isError) {
      alert(message);
      navigateBlogSection()
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, user, navigate, isError, message])

  //check a user has liked a blog or not
  const checkLikedBefore = (array) => {
    for(let i = 0; i < array.length; i++){
      if(array[i]._id == user._id){
        return true
      }
    }
    return false
  }

  if (isLoading) {
    return <Spinner />;
  }

  //Handle User like a blog
  const handleLikeBlog = () => {
    const body = {
      id: blogId,
      user: user._id
    }
    dispatch(likeBlog(body))
  }

  //Handle User submit comment a blog

  const handleCommentChange = (event) => {
    setContent(event.target.value)
  }

  const handleSubmitComment = () => {
    const body = {
      id: blogId,
      user: user._id,
      content: content
    }
    dispatch(commentBlog(body))
  }

  const navigateBlogSection = () => {
    navigate('/allBlogs')
  }

  return (
    <>
      {viewingBlog ? (
        <div className="single-blog">
          <div className="content">
            <div className="top-section">
              {/* Like blog functionality */}
              <div className="like">
                {checkLikedBefore(viewingBlog.likeCount) ? 
                  <>
                    <FaThumbsUp className="icon-liked" />
                    {viewingBlog.likeCount.length} You have liked this blog!
                  </>
                  :
                  <>
                    <FaRegThumbsUp onClick={handleLikeBlog} className="icon" />
                    {viewingBlog.likeCount.length} ThumbsUp
                  </>
                }

              </div>
              <div className="category">
                <FaTag className="icon" />
                {viewingBlog.blogCategory.name}
              </div>
            </div>

            <h1 className="title">{viewingBlog.title}</h1>

            <div className="details">
              <img
                className="icon"
                src={`${process.env.PUBLIC_URL}/userIcons/${viewingBlog.user.icon}`}
                alt=""
              />
              <span className="author">{viewingBlog.user.nickname}</span>
              <span className="date">
                {new Date(viewingBlog.createdAt).toLocaleDateString()}
              </span>
            </div>

            <p className="text">{parser(viewingBlog.content)}</p>
          </div>

          <div className="comment-section">
            <div className="add-comment">
              <h3>Add a comment to this blog</h3>
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
                <button onClick={handleSubmitComment} className="btn">submit</button>
              </form>
            </div>

            <h3 className="comment-number">
              {viewingBlog.comments.length} Comment(s)
            </h3>

            <div className="comments">
              {/* Comments map here */}
              {viewingBlog.comments.map((comment) => (
                <SingleComment comment={comment}/>
              ))}
            </div>
          </div>

          <button onClick={navigateBlogSection} className="back-btn">
            <FaUndoAlt />
            <span> return to select blogs</span>
          </button>
        </div>
      ) : (
        <section>
          <div className="heading">
            <h1>Error - 404: Oops! Blog not found...</h1>
          </div>
        </section>
      )}
    </>
  );
}

export default SingleBlog;
