import React from "react";
import {FaUser, FaCalendar, FaTag} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import image from '../resources/banner.jpg'

function BlogCard(props) {
  const navigate = useNavigate()

  const navigateSingleBlog = () => {
    navigate('/singleBlog')
    localStorage.setItem('viewBlogId', props.blog._id)
  }

  /**
   * @author Pete To
   * @description Check if the blogContent exceeds 15 words, if yes, trim it to 15 words
   * @param {*} blogContent
   * @returns 
   */
  const trimContent = (blogContent) => {
    let text = blogContent.split(' ')
    let trimmedText = ''
    if(text.length <= 15){
      return blogContent
    }else{
      for(let i = 0; i < 14; i++){
        trimmedText += text[i]
      }
      return trimmedText
    }
  }

  return (
    <>
      <div className="blog-card">
        <img src={image} alt="" />

        <div className="blog-content">
          <h3 className="title">{props.blog.title}</h3>

          <div className="details">
            <span><FaUser className="icon" />{props.blog.user.nickname}</span>
            <span><FaCalendar className="icon" />{new Date(props.blog.createdAt).toLocaleString()}</span>
            <span><FaTag className="icon" />{props.blog.blogCategory.name}</span>
          </div>

          <p className="paragraph">
            {trimContent(props.blog.content)}
          </p>

          <button onClick={navigateSingleBlog} className="btn">Read More</button>
        </div>
      </div>
    </>
  );
}

export default BlogCard;
