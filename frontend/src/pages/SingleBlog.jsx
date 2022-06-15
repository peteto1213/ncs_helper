import React, { useEffect } from "react";
import { FaRegThumbsUp, FaTag, FaThumbsUp } from "react-icons/fa";
import SingleComment from "../components/SingleComment";
import { useDispatch, useSelector } from "react-redux";
import { getBlogByBlogId, likeBlog, reset } from "../features/blog/blogSlice";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

function SingleBlog() {
  const blogId = localStorage.getItem("viewBlogId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { viewingBlog, isError, isLoading, message } = useSelector(
    (state) => state.blog
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getBlogByBlogId(blogId));
    if (!user) {
      alert("You need to login to view this page!");
      navigate("/login");
    }
    if (isError) {
      alert(message);
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

            <p className="text">{viewingBlog.content}</p>
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
                  required
                />
                <button className="btn">submit</button>
              </form>
            </div>

            <h3 className="comment-number">
              {viewingBlog.comments.length} Comment(s)
            </h3>

            <div className="comments">
              {/* Comments map here */}
              {viewingBlog.comments.map((comment) => (
                <SingleComment />
              ))}
            </div>
          </div>
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
