import React from 'react'
import { useState } from 'react'
import {FaJava, FaStream, FaSearch} from 'react-icons/fa'
import BlogCard from '../components/BlogCard'

function AllBlogs() {
  const [menuState, setMenuState] = useState(true)

  const toggleMenu = () => {
    setMenuState(!menuState)
  }

  const hideMenu = () => {
    setMenuState(true)
  }

  return (
    <section className='all-blogs'>
        <div className="heading">
            <FaJava className='icon' /> 
            <h1>Blogs</h1>
            <FaStream onClick={toggleMenu} id='stream' />
        </div>

        <div className="content">
          <div className="blog-container">
            <BlogCard />
          </div>

          <div className={menuState? "sidebar" : "sidebar active"}>
            <div className="search-bar">
              <input 
                type="text"
                placeholder='Search by blog title...' 
              />
              <FaSearch onClick={hideMenu} className='icon' />
            </div>

            <div className="category-bar">
              <h3>Blog Categories</h3>
              <p onClick={hideMenu} className='blog-category'>Leisure</p>
              <p onClick={hideMenu} className='blog-category'>Soft-skills</p>
              <p onClick={hideMenu} className='blog-category'>Interviews</p>
            </div>
          </div>

        </div>
    </section>
  )
}

export default AllBlogs