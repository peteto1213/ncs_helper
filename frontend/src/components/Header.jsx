import React from 'react'
import { useState } from 'react'
import {FaRobot, FaGraduationCap, FaCoffee, FaRocket, FaUser, FaRegPaperPlane, FaTimes, FaSignOutAlt} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import icon from '../resources/header_icon.png'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)

    const[menu, setMenu] = useState(false)

    const showMenu = () => {
        setMenu(true)
    }

    window.onscroll = () => {
        hideMenu()
    }

    const navigateLogin = () => {
        navigate('/login')
    }

    const navigateProfile = () => {
        navigate('/userProfile')
    }

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
        hideMenu()
        navigate('/')
    }

    const hideMenu = () => {
        setMenu(false)
    }

  return (
    <header className='header'>
        <div className="logo">
            <Link to='/' onClick={hideMenu} ><img src={icon} alt="icon" />NCSHelper</Link>
        </div>

        <nav className={menu? "navbar active" : "navbar"}>
            <Link to='/dashboard' onClick={hideMenu}><FaRocket />Dashboard</Link>
            <Link to='/allCourses' onClick={hideMenu}><FaGraduationCap />Courses</Link>
            <Link to='/collaboration' onClick={hideMenu}><FaRobot />Collaboration</Link>
            <Link to='/allBlogs' onClick={hideMenu}><FaCoffee />Blogs</Link>
        </nav>

        <div className="icons">
            {menu ?
                <FaTimes 
                    className='icon' 
                    id='menu-bars'
                    onClick={hideMenu} 
                />
                :
                <FaRegPaperPlane 
                    className='icon' 
                    id='menu-bars'
                    onClick={showMenu} 
                />
            }
            {user ?
                <>
                    <img 
                        onClick={navigateProfile} 
                        className='user-icon' 
                        src={`${process.env.PUBLIC_URL}/userIcons/${user.icon}`} 
                        alt="user_icon" 
                    />

                    <FaSignOutAlt onClick={handleLogout} className='icon'/>
                </>
                :
                <>
                    <FaUser className='icon' onClick={navigateLogin}/>
                </>
            }
        </div>
    </header>
  )
}

export default Header