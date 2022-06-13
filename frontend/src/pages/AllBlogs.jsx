import React from 'react'
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {FaJava, FaStream, FaSearch, FaRegPlusSquare} from 'react-icons/fa'
import BlogCard from '../components/BlogCard'
import {getAllBlogs, reset} from '../features/blog/blogSlice'
import {getAllBlogCategories} from '../features/blogCategory/blogCategorySlice'
import Spinner from '../components/Spinner'

function AllBlogs() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {blogs, isLoading, isError, message} = useSelector((state) => state.blog)
  const {blogCategories} = useSelector((state) => state.blogCategory)

  const [menuState, setMenuState] = useState(true)

  const toggleMenu = () => {
    setMenuState(!menuState)
  }

  const hideMenu = () => {
    setMenuState(true)
  }

  const navigateCreateBlog = () => {
    navigate('/createBlog')
  }

  //render one time once entered this page
  useEffect(() => {
    dispatch(getAllBlogs())
    dispatch(getAllBlogCategories())
    if(isError){
      alert(message)
    }

    return () => {
      dispatch(reset())
    }
  }, [isError, message, reset, dispatch])

  if(isLoading){
    return <Spinner />
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
            <button onClick={navigateCreateBlog} className='btn'><FaRegPlusSquare />Create a new blog</button>
            {/* BlogCard map here */}
            {blogs.length !== 0 ? 
              blogs.map(blog => 
                <BlogCard blog={blog}/>
              )
              :
              <h1 className='no-wordings'>Oops! There is currently no blog post, please check again later!</h1>
          }
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
              {/* Blog Categories map here */}
              {blogCategories.length !== 0 ?
                blogCategories.map(blogCategory =>
                  <p onClick={hideMenu} className='blog-category'>{blogCategory.name}</p>
                )
                :
                <></>
              }
            </div>
          </div>

        </div>
    </section>
  )
}

export default AllBlogs