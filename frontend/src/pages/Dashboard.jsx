import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {FaRocket} from 'react-icons/fa'
import collaboration from '../resources/collaboration.png'
import blog from '../resources/blog.jpg'
import feedback from '../resources/feedback.jpg'
import setting from '../resources/setting.jpg'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

function Dashboard() {
  const {user} = useSelector((state) => state.auth)
  const navigate = useNavigate()
  
  /**
   * @author Pete To
   * @description If the user has not logged in, redirect to login page immediately
   */
  useEffect(() => {
    if(!user){
      navigate('/login')
    }
  }, [])

  return (
    <section className='dashboard'>
      <div className='heading'>
        <FaRocket /> 
        <h1>Dashboard</h1>
      </div>

      <div className="card-container">

        <div className="card">
          <img src={collaboration} alt="collaboration" />
          <h3>Collaboration Guides</h3>
          <p>Manage or publish your created guides according to different courses in the program to help others!</p>
          <Link to='/collaboration'>Manage</Link>
        </div>

        <div className="card">
          <img src={blog} alt="blog" />
          <h3>Blogs</h3>
          <p>Manage your personal blogs or write a blog for leisure and sharing purposes!</p>
          <Link to='/blog'>View</Link>
        </div>

        <div className="card">
          <img src={setting} alt="setting" />
          <h3>Account settings</h3>
          <p>Manage your account settings, such as changing nickname, profile picture and password</p>
          <Link to='/userProfile'>Manage</Link>
        </div>

        <div className="card">
          <img src={feedback} alt="feedback" />
          <h3>Feedback</h3>
          <p>Tell us how you feel about this web application!</p>
          <Link to='/feedback'>Send Feedback</Link>
        </div>

      </div>

    </section>
  )
}

export default Dashboard