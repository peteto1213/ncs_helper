import React from 'react'
import { FaPencilAlt, FaRegPlusSquare } from "react-icons/fa"
import MyGuideCard from '../components/MyGuideCard'
import { useNavigate } from 'react-router-dom'

function MyGuide() {

    const navigate = useNavigate()
    const navigateCreateGuide = () =>{
        navigate('/createGuide')
    }

  return (
    <section className='my-guide'>
        <div className="heading">
            <FaPencilAlt />
            My Guides
        </div>

        <button onClick={navigateCreateGuide} className="create-btn">
            <FaRegPlusSquare />Contribute a new guide
        </button>

        <div className="guide-container">
            <MyGuideCard />
        </div>
    </section>
  )
}

export default MyGuide