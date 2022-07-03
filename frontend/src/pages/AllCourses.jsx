import React, { useEffect } from 'react'
import { FaGraduationCap } from 'react-icons/fa'
import CourseCard from '../components/CourseCard'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses, reset } from '../features/course/courseSlice'
import Spinner from '../components/Spinner'

function AllCourses() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { courses, isLoading, isError, message } = useSelector((state) => state.course)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if(!user){
      navigate('/login')
    }
    if(isError){
      alert(message)
      dispatch(reset())
    }

    dispatch(getAllCourses())

    //clean-up function
    return () => {
      dispatch(reset())
    }

  }, [dispatch, user, isError, message])

  if(isLoading){
    return <Spinner />
  }

  return (
    <section className='all-course'>
        <div className="heading">
            <FaGraduationCap />
            <h1>Choose a course</h1>
        </div>

        <div className="course-card-container">
          {/* Courses map here */}
          {courses.map(course =>
            <CourseCard
              key= {course._id}
              courseCode = {course.courseCode}
              name = {course.name}
              description = {course.description}
              courseId = {course._id}
            />
          )}
        </div>

    </section>
  )
}

export default AllCourses
