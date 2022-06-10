import React from "react";
import {FaUser, FaCalendar, FaTag} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import image from '../resources/banner.jpg'

function BlogCard() {
  const navigate = useNavigate()

  const navigateSingleBlog = () => {
    navigate('/singleBlog')
  }

  return (
    <>
      <div className="blog-card">
        <img src={image} alt="" />

        <div className="blog-content">
          <h3 className="title">Blog Title</h3>

          <div className="details">
            <span><FaUser className="icon" />Pete To</span>
            <span><FaCalendar className="icon" />June 09, 2022</span>
            <span><FaTag className="icon" />Leisure</span>
          </div>

          <p className="paragraph">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. At nobis
            veritatis laborum nam praesentium facere.
          </p>

          <button onClick={navigateSingleBlog} className="btn">Read More</button>
        </div>
      </div>
    </>
  );
}

export default BlogCard;
