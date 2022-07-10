import React from 'react'
import { FaPencilAlt, FaRegPlusSquare } from "react-icons/fa"
import MyGuideCard from '../components/MyGuideCard'

function MyGuide() {
  return (
    <section className='my-guide'>
        <div className="heading">
            <FaPencilAlt />
            My Guides
        </div>

        <div className="guide-container">
            <MyGuideCard />
        </div>
    </section>
  )
}

export default MyGuide