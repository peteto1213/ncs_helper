import React, { useState, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateCourseByCourseId, createSubtopic, reset } from '../features/admin/adminSlice'
import { getSubtopicsByCourseId } from '../features/subtopic/subtopicSlice'
import Spinner from '../components/Spinner'
import { FaFastBackward } from 'react-icons/fa'

function UpdateCourse() {
    const { state } = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { operatingCourse, isLoading, isError, message } = useSelector((state) => state.admin)
    const { user } = useSelector((state) => state.auth)
    const { subtopics } = useSelector((state) => state.subtopic)

    //Refresh the page one time
    function refreshPage() {
        window.location.reload(false);
    }

    const [form, setForm] = useState({
        courseCode: state.courseCode,
        name: state.name,
        description: state.description
    })

    const handleDetailsChange = (event) => {
        const { name, value } = event.target

        setForm(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleDetailsSubmit = (event) => {
        event.preventDefault()

        let courseDetails = {
            id: state.courseId,
            courseCode: form.courseCode,
            name: form.name,
            description: form.description
        }

        dispatch(updateCourseByCourseId(courseDetails))
        if(!isError){
            alert('course details updated successfully')
            navigate('/dashboard')
        }
    }

    const [subtopicForm, setSubtopicForm] = useState({
        name: "",
        description: ""
    })

    const handleSubtopicChange = (event) => {
        const { name, value } = event.target
        setSubtopicForm(prevState => {
            return{
                ...prevState,
                [name]: value
            }
        })
    }

    const handleCreateSubtopic = (event) => {
        event.preventDefault()
        let subtopicDetails = {
            name: subtopicForm.name,
            description: subtopicForm.description,
            course: state.courseId
        }

        dispatch(createSubtopic(subtopicDetails))
        if(!isError){
            alert('subtopic added successfully!')
            refreshPage()
        }
    }

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
        if(isError){
            alert(message)
            navigate('/home')
        }
        dispatch(getSubtopicsByCourseId(state.courseId))
    }, [user, isError, message, navigate])

    if(isLoading){
        return <Spinner />
    }

  return (
    <section className='update-course'>
        {/* ===================== Edit course details =============================== */}
        <div className="heading">
            <h1>Update Course Details: {state.courseCode}</h1>
        </div>

        <form onSubmit={handleDetailsSubmit}>
            <div className="input-field">
            <h3>Course Code</h3>
            <input
                type="text"
                name='courseCode'
                value={form.courseCode}
                onChange={handleDetailsChange}
            />
            </div>

            <div className="input-field">
            <h3>Course Name</h3>
            <input
                type="text"
                name='name'
                value={form.name}
                onChange={handleDetailsChange}
            />
            </div>

            <div className="input-field">
            <h3>Description</h3>
            <input
                type="text"
                name='description'
                value={form.description}
                onChange={handleDetailsChange}
            />
            </div>

            <button className="btn">
                Update Course Details
            </button>
        </form>
        {/* ===================== Adding Subtopics to the course =============================== */}
      <div className="heading">
            <h1>Add Subtopic to Course: {state.courseCode}</h1>
        </div>

        <div className="content">
            <form onSubmit={handleCreateSubtopic} className='subtopic-form'>
                <div className="input-field">
                <h3>Subtopic Name</h3>
                <input
                    type="text"
                    name='name'
                    value={subtopicForm.name}
                    onChange={handleSubtopicChange}
                    placeholder="enter a name..."
                    required
                />
                </div>

                <div className="input-field">
                <h3>Description</h3>
                <input
                    type="text"
                    name='description'
                    value={subtopicForm.description}
                    onChange={handleSubtopicChange}
                    placeholder="subtopic description..."
                    required
                />
                </div>

                <button className="btn">
                    Add Subtopic
                </button>
            </form>

            <form className='subtopic-form list'>
                <div className="input-field">
                <h3 className='list-h3'>List of Existing Subtopics</h3>
                </div>

                <div className="input-field">
                    {/* Subtopics map here */}
                {subtopics.map(subtopic =>
                    <input
                        type="text"
                        value={subtopic.name}
                        disabled
                    />
                )}
                </div>
            </form>
        </div>

      <Link to='/dashboard' className='back-btn'><FaFastBackward /> Back to Dashboard</Link>

    </section>
  )
}

export default UpdateCourse