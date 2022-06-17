import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { FaPen, FaTrashAlt, FaThumbsUp, FaTag } from "react-icons/fa";
import image from '../resources/banner.jpg'


import ModalBox from "./ModalBox";

function MyBlogCard(props) {
  const navigate = useNavigate()
  const [modalState, setModalState] = useState(false)
  const { blog } = props

  const navigateEditBlog = () => {
    navigate('/editBlog', {state: { 
      id: blog._id,
      title: blog.title,
      content: blog.content,
      blogCategory: blog.blogCategory
    }})
  }

  const deleteBlog = () => {  
    setModalState(true)
  }

  return (
    <>
      <div className="myblog-card">
        {modalState && 
          <ModalBox 
            action={`delete blog - "${blog.title}"`}
            deleteType='blog'
            id={blog._id}
          />
        }
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
        <h4 className="date update">Updated At: {new Date(blog.updatedAt).toLocaleString('en-US')}</h4>

        <div className="actions">
          <button onClick={navigateEditBlog} className="edit-btn">
            <FaPen className="icon" />
            edit
          </button>
          <button onClick={deleteBlog} className="delete-btn">
            <FaTrashAlt className="icon" />
            delete
          </button>
        </div>
      </div>
    </>
  );
}

export default MyBlogCard;
