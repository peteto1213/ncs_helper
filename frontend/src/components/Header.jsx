import React from 'react'
import { useState } from 'react'
import {FaRobot, FaGraduationCap, FaCoffee, FaRocket, FaUser, FaRegPaperPlane, FaTimes} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import icon from '../resources/header_icon.png'

function Header() {
    const navigate = useNavigate()
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
            <Link to='/course' onClick={hideMenu}><FaGraduationCap />Courses</Link>
            <Link to='/collaboration' onClick={hideMenu}><FaRobot />Collaboration</Link>
            <Link to='/blog' onClick={hideMenu}><FaCoffee />Blogs</Link>
        </nav>

        <div className="icons">
            <FaUser className='icon' onClick={navigateLogin}/>
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
        </div>
    </header>
  )
}

export default Header