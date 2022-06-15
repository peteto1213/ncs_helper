import React from "react";
import {FaUser, FaCalendar, FaTag, FaTrash} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import image from '../resources/banner.jpg'
import { useSelector } from 'react-redux'

function BlogCard(props) {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

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
    //remove all html tags
    let strippedString = blogContent.replace(/(<([^>]+)>)/gi, " ")
    strippedString = strippedString.replace("&nbsp;", ' ')
    
    let text = strippedString.split(' ')
    let trimmedText = ''
    if(text.length <= 15){
      return strippedString
    }else{
      for(let i = 0; i < 14; i++){
        trimmedText += " "
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
          <div className="first-row">
            <h3 className="title">{props.blog.title}</h3>
            {(user.userType === "admin") &&
              <div className="trash-icon">
                <FaTrash />
              </div>
            }
          </div>

          <div className="details">
            <span><FaUser className="icon" />{props.blog.user.nickname}</span>
            <span><FaCalendar className="icon" />{new Date(props.blog.createdAt).toLocaleDateString()}</span>
            <span><FaTag className="icon" />{props.blog.blogCategory.name}</span>
          </div>

          <p className="paragraph">
            {(trimContent(props.blog.content))}...
          </p>

          <button onClick={navigateSingleBlog} className="btn">Read More</button>
        </div>
      </div>
    </>
  );
}

export default BlogCard;
