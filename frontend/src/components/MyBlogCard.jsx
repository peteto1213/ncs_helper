import React from "react";
import { FaPen, FaTrashAlt, FaThumbsUp, FaTag } from "react-icons/fa";
import image from '../resources/banner.jpg'

function MyBlogCard(props) {

  const { blog } = props

  return (
    <>
      <div className="myblog-card">
        <div className="like">
            <h2>{blog.likeCount.length}</h2>
            <span> </span>
            <FaThumbsUp />
        </div>

        <img src={image} alt="" />

        <h3>
          Title: <span>{blog.title}</span>
        </h3>

        <p>
          <FaTag />BlogCategory: {blog.blogCategory.name}
        </p>

        <h4 className="date">Created At: {new Date(blog.createdAt).toLocaleString('en-US')}</h4>

        <div className="actions">
          <button className="edit-btn">
            <FaPen className="icon" />
            edit
          </button>
          <button className="delete-btn">
            <FaTrashAlt className="icon" />
            delete
          </button>
        </div>
      </div>
    </>
  );
}

export default MyBlogCard;
