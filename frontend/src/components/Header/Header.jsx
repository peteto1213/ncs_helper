import React from 'react'
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import './style.css'
import icon from '../../resources/header_icon.png'

function Header() {
  return (
    <header className='header'>

        <div className="logo">
            <Link to='/' ><img src={icon} alt="icon" />NCSHelper</Link>
        </div>

        <ul>
            <li>
                <Link to='/login'>
                    <FaSignInAlt /> Login
                </Link>
            </li>
            <li>
                <Link to='/register'>
                    <FaUser /> Register
                </Link>
            </li>
        </ul>

    </header>
  )
}

export default Header