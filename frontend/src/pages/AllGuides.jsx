import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaRegHandshake, FaSearch, FaPlus, FaCaretRight, FaStream } from 'react-icons/fa'
import GuideCard from '../components/GuideCard'

function AllGuides() {
    const navigate = useNavigate()
    const [sidebarDisplay, setSidebarDisplay] = useState(false)

    const toggleSidebar = () => {
        setSidebarDisplay(!sidebarDisplay)
    }

    const navigateCreateGuide = () => {
        navigate('/createGuide')
    }

  return (
    <section className='all-guides'>
        <div className="heading">
            <FaRegHandshake className='icon' />
            <h1>Collaboration Guide</h1>
            <FaStream onClick={toggleSidebar} id='stream' />
        </div>

        <div className="content">
            <div className={sidebarDisplay? "sidebar active" : "sidebar"}>
                <div className="search-bar">
                    <input 
                        type="text"
                        placeholder='search guide name...'
                    />
                    <FaSearch className='icon' />
                </div>

                <div className="category-bar">
                    <h3>Subtopics</h3>
                    <h3 className="category"><FaCaretRight />Version control system</h3>
                    <h3 className="category"><FaCaretRight />Version control system</h3>
                    <h3 className="category"><FaCaretRight />Version control system</h3>
                    <h3 className="category"><FaCaretRight />Version control system</h3>
                </div>
            </div>

            <div className="guide-container">
                <button onClick={navigateCreateGuide} className='btn'><FaPlus /> contribute new guide</button>

                {/* Guide card maps here */}
                <GuideCard />

            </div>

        </div>
    </section>
  )
}

export default AllGuides