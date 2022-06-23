import React from 'react'
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {FaJava, FaStream, FaSearch, FaRegPlusSquare, FaTrash} from 'react-icons/fa'
import BlogCard from '../components/BlogCard'
import {getAllBlogs, getBlogsByCategoryId, getBlogsByFilteredBlogTitle, reset} from '../features/blog/blogSlice'
import {getAllBlogCategories} from '../features/blogCategory/blogCategorySlice'
import Spinner from '../components/Spinner'

function AllBlogs() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {blogs, isLoading, isError, message} = useSelector((state) => state.blog)
  const {blogCategories} = useSelector((state) => state.blogCategory)
  const { user } = useSelector((state) => state.auth)

  const [menuState, setMenuState] = useState(true)

  const toggleMenu = () => {
    setMenuState(!menuState)
  }

  const hideMenu = () => {
    setMenuState(true)
  }

  //filter blog by blog category id
  const filterBlogsByCategory = (id) => {
    dispatch(getBlogsByCategoryId(id))
    hideMenu()
  }

  const [searchText, setSearchText] = useState("")
  const handleSearchText = (event) => {
    setSearchText(event.target.value)
  }

  const filterBlogsByBlogTitle = (searchText) => {
    if(searchText){
      dispatch(getBlogsByFilteredBlogTitle(searchText))
    }else{
      dispatch(getAllBlogs())
    }
    hideMenu()
  }

  const cancelFilterBlogCategory = () => {
    dispatch(getAllBlogs())
    hideMenu()
  }

  const navigateCreateBlog = () => {
    navigate('/createBlog')
  }

  //render one time once entered this page
  useEffect(() => {
    if(!user){
      alert('Please login to proceed')
      navigate('/login')
    }

    dispatch(getAllBlogs())
    dispatch(getAllBlogCategories())
    if(isError){
      alert(message)
      navigate('/')
    }

    return () => {
      dispatch(reset())
    }
  }, [isError, message, reset, dispatch, navigate])

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
                <BlogCard key={blog._id} blog={blog}/>
              )
              :
              <h1 className='no-wordings'>Oops! There is currently no blog post related to this blog name/category, please check again later!</h1>
          }
          </div>

          <div className={menuState? "sidebar" : "sidebar active"}>
            <div className="search-bar">
              <input 
                type="text"
                name='searchText'
                onChange={handleSearchText}
                value={searchText}
                placeholder='Search by blog title...' 
              />
              <FaSearch onClick={() => {filterBlogsByBlogTitle(searchText)}} className='icon' />
            </div>

            <div className="category-bar">
              <h3>Blog Categories</h3>
                <p onClick={() => {cancelFilterBlogCategory()}} className='blog-category'>All Blogs</p>
              
              {/* Blog Categories map here */}
              {blogCategories.length !== 0 ?
                blogCategories.map(blogCategory =>
                  <p 
                    key={blogCategory._id} 
                    onClick={() => {filterBlogsByCategory(blogCategory._id)}} 
                    className='blog-category'>
                    {blogCategory.name}
                  </p>
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