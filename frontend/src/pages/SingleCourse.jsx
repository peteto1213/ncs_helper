import React, { useEffect } from 'react'
import SubtopicCard from '../components/SubtopicCard'
import { FaFastBackward, FaFolderPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getSubtopicsByCourseId, reset } from '../features/subtopic/subtopicSlice'
import { getCourseByCourseId } from '../features/course/courseSlice'
import Spinner from '../components/Spinner'

function SingleCourse() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { subtopics, isLoading, isError, message } = useSelector((state) => state.subtopic)
    const { user } = useSelector((state) => state.auth)
    const { viewingCourse } = useSelector((state) => state.course)

    const navigateCourses = () => {
        navigate('/allCourses')
    }

    const navigateAddResources = () => {
        navigate('/addResources')
    }

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
        
        dispatch(getCourseByCourseId(localStorage.getItem('viewCourseId')))
        dispatch(getSubtopicsByCourseId(localStorage.getItem('viewCourseId')))

        //clean-up action
        return () => {
            dispatch(reset())
        }
    }, [dispatch, navigate, isError, message, user])

    if(isLoading){
        return <Spinner />
    }

  return (
    <section className='single-course'>
        <div className="heading">
            <h1>{viewingCourse.courseCode} - {viewingCourse.name}</h1>
        </div>

        <div className="subtopic-container">
            <button onClick={navigateAddResources} className='add-btn'><FaFolderPlus /> Contribute to CSC8011</button>
            {/* Subtopc maps here */}
            {subtopics.map(subtopic =>
                <SubtopicCard 
                    name = {subtopic.name}
                    description = {subtopic.description}
                    resources = {subtopic.resources}
                    course = {subtopic.course}
                />
            )}

            <button onClick={navigateCourses} className='btn'><FaFastBackward className='icon' /> Back to Select Courses</button>
        </div>

    </section>
  )
}

export default SingleCourse