import React from 'react'
import {FaRegThumbsUp, FaTag} from 'react-icons/fa'
import SingleComment from '../components/SingleComment'

function SingleBlog() {
  return (
    <div className='single-blog'>
        <div className="content">
            <div className="top-section">
                <div className="like">
                    <FaRegThumbsUp className='icon' />
                    5 ThumbsUp
                </div>
                <div className="category">
                    <FaTag className='icon'/>
                    Leisure
                </div>
            </div>

            <h1 className='title'>Blog Title Here</h1>

            <div className="details">
                <img className='icon' src="" alt="" />
                <span className="author">Pete To</span>
                <span className="date">on 10th June, 2022</span>
            </div>
        
            <p className='text'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur suscipit, facilis quis quibusdam aliquam molestias at iste vero voluptas odit eveniet, inventore, sint voluptatem! Expedita dolores enim architecto temporibus, maiores numquam corporis iusto accusantium mollitia maxime doloremque sapiente culpa repellat nulla quos pariatur quas inventore nihil delectus modi impedit! Quas.
            </p>
        </div>

        <div className="comment-section">
            <div className="add-comment">
                <h3>Add a comment to this blog</h3>
                <textarea 
                    name='newComment'
                    rows="4" 
                    column="50"
                    placeholder='type your comments here...'
                />
                <button className='btn'>submit</button>
            </div>

            <h3 className="comment-number">
                1 Comment(s)
            </h3>

            <div className="comments">
                {/* Comments map here */}
                <SingleComment />
            </div>
        </div>
    </div>
  )
}

export default SingleBlog