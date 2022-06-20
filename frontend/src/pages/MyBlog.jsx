import React, {useEffect} from "react"
import { useNavigate } from 'react-router-dom'
import { FaPencilAlt, FaRegPlusSquare } from "react-icons/fa"
import MyBlogCard from "../components/MyBlogCard"

import { useDispatch, useSelector } from 'react-redux'
import { getUserBlogs, reset } from '../features/blog/blogSlice'
import Spinner from '../components/Spinner'

function MyBlog() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {userBlogs, isError, isLoading, message } = useSelector((state) => state.blog)

  useEffect(() => {
    dispatch(getUserBlogs())

    if(isError){
      alert(message)
      navigate('/')
    }

    return () => {
      dispatch(reset())
    }
  }, [dispatch, isError, message])

  const navigateCreateBlog = () => {
    navigate('/createBlog')
  }

  if(isLoading){
    return <Spinner />
  }

  return (
    <section className="my-blog">
      <div className="heading">
        <FaPencilAlt />
        <h1>My Blogs</h1>
      </div>

      <button onClick={navigateCreateBlog} className="create-btn">
        <FaRegPlusSquare />Create a new blog
      </button>

      {(userBlogs.length !== 0) ?
        <div className="myblog-container">
          {/* My Blog Card map here */}
          {userBlogs.map(blog => 
              <MyBlogCard key={blog._id} blog={blog}/>
            )}
        </div>
        :
        <>
          <h1 className="no-wordings">You haven't created any blogs yet!</h1>
        </>  
      }
    </section>
  );
}

export default MyBlog;
