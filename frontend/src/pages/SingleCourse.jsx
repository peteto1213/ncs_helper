import React from 'react'
import SubtopicCard from '../components/SubtopicCard'
import { FaFastBackward, FaFolderPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function SingleCourse() {

    const navigate = useNavigate()

    const navigateCourses = () => {
        navigate('/allCourses')
    }

    const navigateAddResources = () => {
        navigate('/addResources')
    }

  return (
    <section className='single-course'>
        <div className="heading">
            <h1>CSC8011 - Introduction to Software Development</h1>
        </div>

        <div className="subtopic-container">
            <button onClick={navigateAddResources} className='add-btn'><FaFolderPlus /> Contribute to CSC8011</button>
            {/* Subtopc maps here */}
            <SubtopicCard />
            <SubtopicCard />
            <SubtopicCard />

            <button onClick={navigateCourses} className='btn'><FaFastBackward className='icon' /> Back to Select Courses</button>
        </div>

    </section>
  )
}

export default SingleCourse