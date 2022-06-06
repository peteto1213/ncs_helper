import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {FaRocket, FaUserCheck, FaGraduationCap, FaMicroblog, FaLock, FaBars} from 'react-icons/fa'
import collaboration from '../resources/collaboration.png'
import blog from '../resources/blog.jpg'
import feedback from '../resources/feedback.jpg'
import setting from '../resources/setting.jpg'
import password from '../resources/password.png'
import robot from '../resources/robot.png'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import Spinner from '../components/Spinner'
import {reset, getAllUsers} from '../features/admin/adminSlice'

function Dashboard() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {users, isLoading, isError, message} = useSelector((state) => state.admin)
  const [error, setError] = useState('')

  const {user} = useSelector((state) => state.auth)
  const [userType, setUserType] = useState("student")
  const [menuClass, setMenuClass] = useState(true)
  
  //render one time
  useEffect(() => {
    if(!user){
      navigate('/login')
    }else{
      setUserType(user.userType) //identify which layout to show
      dispatch(getAllUsers())
    }
    //Clearer function of useEffect upon leaving the dashboard
    return () => {
      dispatch(reset())
    }
  }, [])

  //render based on conditions
  useEffect(() => {
    if(isError){
      setError(message)
    }
  }, [isError, message])

  const toggleMenu = () => {
    setMenuClass(!menuClass)
  }

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      {userType !== "admin" ?
        // User dashboard 
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
              <p>Manage your account settings, such as changing nickname, profile picture</p>
              <Link to='/userProfile'>Manage</Link>
            </div>

            <div className="card">
              <img src={password} alt="setting" />
              <h3>Password Changing</h3>
              <p>Change your password regularly here to protect your account</p>
              <Link to='/changePassword'>Change</Link>
            </div>

            <div className="card">
              <img src={feedback} alt="feedback" />
              <h3>Feedback</h3>
              <p>Tell us how you feel about this web application, we are welcome to hear!</p>
              <Link to='/feedback'>Send Feedback</Link>
            </div>
          </div>
        </section>
        :
        // Admin dashboard
        <div className='admin-dashboard'>

          <div className={menuClass? "menu" : "menu active"}>
            <div className="logo">
              <img src={robot} alt="" />
              <h2>Admin Dashboard</h2>
            </div>

            <div className="items">
              <li><FaUserCheck className='icon' /> <a href="#user">Manage Users</a></li>
              <li><FaGraduationCap className='icon' /> <a href="#course">Manage Courses</a></li>
              <li><FaMicroblog className='icon' /> <a href="#blog">Manage Blogs</a></li>
              <li><FaLock className='icon' /> <a href="#">Change Password</a></li>
            </div>
          </div>

          <div className="content">
            <div className="nav">
              <FaBars onClick={toggleMenu} id='menu-btn' className='icon' />
            </div>
            <h3 className='i-name'>Website Details - Choose your actions to view the data</h3>

            <div className="values">
              <div className="val-box">
                <FaUserCheck className='icon' />
                <div>
                  <h3>{users.length}</h3>
                  <span>Users</span>
                </div>
              </div>
            </div>

            <div className="board">
              {/* User Table */}
              <table id='user'>
                <thead>
                  <tr>
                    <td>Nickname</td>
                    <td>Email Address</td>
                    <td>Status</td>
                    <td>Permission Type</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                {/* User Map here */}
                {users.map(element =>
                    <tbody>
                    <tr>
                      <td className='people'>
                        <img src={`${process.env.PUBLIC_URL}/userIcons/${element.icon}`} alt="" />
                        <div className="people-de">
                          <h5>{element.nickname}</h5>
                          <p></p>
                        </div>
                      </td>

                      <td className="people-des">
                        <h5>{element.email}</h5>
                        <p></p>
                      </td>

                      <td className={element.activationStatus ? 'active' : 'inactive'}><p>{element.activationStatus ? "active" : "inactive"}</p></td>

                      <td className='role'>
                        <p>{element.userType}</p>
                      </td>

                      <td>
                        <a className='edit' href="#">Edit</a>
                        <a className='delete' href="#">Delete</a>
                      </td>

                    </tr>
                    </tbody>
                  )
                }
                
              </table>
              
              {/* Course Table */}
              <table id='course'>
                <thead>
                  <tr>
                    <td>Course Code</td>
                    <td>Course Name</td>
                    <td>Description</td>
                    <td>Background Color</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                {/* Course Map here */}
                
                  <tbody>
                    <tr>
                      <td className='people'>
                        <div className="people-de">
                          <h5>CSC8011</h5>
                          <p></p>
                        </div>
                      </td>

                      <td className="people-des">
                        <h5>Introduction to Software Development</h5>
                        <p></p>
                      </td>

                      <td className="people-des">
                        <h5>Introduction to Software Development</h5>
                      </td>

                      <td className='people'>
                        <div className="people-de">
                          <img src="" alt="" />
                          <h5>Red</h5>
                          <p></p>
                        </div>
                      </td>

                      <td>
                        <a className='edit' href="#">Edit</a>
                        <a className='delete' href="#">Delete</a>
                      </td>

                    </tr>
                  </tbody>
                  
                
                
              </table>
              
              {/* Course Table */}
              <table id='blog'>
                <thead>
                  <tr>
                    <td>Blog category</td>
                    <td>Description</td>
                    <td>Background Color</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                {/* Course Map here */}
                
                  <tbody>
                    <tr>
                      <td className='people'>
                        <div className="people-de">
                          <h5>Leisure</h5>
                          <p></p>
                        </div>
                      </td>

                      <td className="people-des">
                        <h5>Things besides techical skills</h5>
                        <p></p>
                      </td>

                      <td className='people'>
                        <div className="people-de">
                          <img src="" alt="" />
                          <h5>Red</h5>
                          <p></p>
                        </div>
                      </td>

                      <td>
                        <a className='edit' href="#">Edit</a>
                        <a className='delete' href="#">Delete</a>
                      </td>

                    </tr>
                  </tbody>
                  
                
                
              </table>
            </div>
          </div>

        </div>
      }
    </>
  )
}

export default Dashboard