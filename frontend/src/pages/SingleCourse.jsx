import React, { useEffect } from 'react'
import SubtopicCard from '../components/SubtopicCard'
import { FaFastBackward, FaFolderPlus, FaSadTear } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getSubtopicsByCourseId, reset } from '../features/subtopic/subtopicSlice'
import { getCourseByCourseId } from '../features/course/courseSlice'
import Spinner from '../components/Spinner'

function SingleCourse() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()

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

        if(isError){
            alert(message)
        }
        
        dispatch(getCourseByCourseId(params.courseId))
        dispatch(getSubtopicsByCourseId(params.courseId))

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
            <button onClick={navigateAddResources} className='add-btn'><FaFolderPlus /> Contribute to {viewingCourse.courseCode}</button>
            {/* Subtopc maps here */}
            {subtopics.length > 0 && subtopics.map(subtopic =>
                <SubtopicCard
                    key = {subtopic._id} 
                    name = {subtopic.name}
                    description = {subtopic.description}
                    resources = {subtopic.resources}
                    course = {subtopic.course}
                    id = {subtopic._id}
                />
            )}
            {/* No subtopics for the course, display corresponding message */}
            {subtopics.length <= 0 && 
                <>
                    <div className="empty-message">
                        <FaSadTear className='icon' />
                        <h3>There is currently no subtopic for this course...</h3>
                    </div>
                </>
            }

            <button onClick={navigateCourses} className='btn'><FaFastBackward className='icon' /> Back to Select Courses</button>
        </div>

    </section>
  )
}

export default SingleCourse