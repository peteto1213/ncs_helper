import React, { useEffect } from "react";
import { FaRegThumbsUp, FaTag } from "react-icons/fa";
import SingleComment from "../components/SingleComment";
import { useDispatch, useSelector } from "react-redux";
import { getBlogByBlogId, reset } from "../features/blog/blogSlice";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

function SingleBlog() {
  const blogId = localStorage.getItem("viewBlogId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { viewingBlog, isError, isLoading, message, isSuccess } = useSelector(
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
  }, [dispatch, user, navigate, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {viewingBlog ? (
        <div className="single-blog">
          <div className="content">
            <div className="top-section">
              <div className="like">
                <FaRegThumbsUp className="icon" />
                {viewingBlog.likeCount.length} ThumbsUp
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
