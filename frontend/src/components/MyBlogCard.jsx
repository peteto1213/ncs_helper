import React from "react";
import { FaPen, FaTrashAlt, FaThumbsUp } from "react-icons/fa";
import image from '../resources/banner.jpg'

function MyBlogCard() {
  return (
    <>
      <div className="myblog-card">
        <div className="like">
            <h2>0</h2>
            <FaThumbsUp />
        </div>

        <img src={image} alt="" />

        <h3>
          Title: <span>Title goes here</span>
        </h3>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          mollitia asperiores officiis, perspiciatis vel harum!
        </p>

        <h4 className="date">Created At: 2022/06/12</h4>

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
