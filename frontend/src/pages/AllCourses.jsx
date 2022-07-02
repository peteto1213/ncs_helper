import React from 'react'
import { FaGraduationCap } from 'react-icons/fa'
import CourseCard from '../components/CourseCard'

function AllCourses() {
  return (
    <section className='all-course'>
        <div className="heading">
            <FaGraduationCap />
            <h1>Choose a course</h1>
        </div>

        <div className="course-card-container">
          {/* Courses map here */}
          <CourseCard />
          <CourseCard />
        </div>

    </section>
  )
}

export default AllCourses
