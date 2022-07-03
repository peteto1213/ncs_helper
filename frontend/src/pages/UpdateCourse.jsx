import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateCourseByCourseId, reset } from '../features/admin/adminSlice'
import Spinner from '../components/Spinner'
import { FaFastBackward } from 'react-icons/fa'

function UpdateCourse() {
    const { state } = useLocation()
    const { operatingCourse, isLoading, isError, message } = useSelector((state) => state.admin)

    const [form, setForm] = useState({
        courseCode: state.courseCode,
        name: state.name,
        description: state.description
    })

    const handleChange = (event) => {
        const { name, value } = event.target

        setForm(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    }

  return (
    <section className='update-course'>
        <div className="heading">
            <h1>Update Course: {state.courseCode}</h1>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="input-field">
            <h3>Course Code</h3>
            <input
                type="text"
                name='courseCode'
                value={form.courseCode}
                onChange={handleChange}
            />
            </div>

            <div className="input-field">
            <h3>Course Name</h3>
            <input
                type="text"
                name='name'
                value={form.name}
                onChange={handleChange}
            />
            </div>

            <div className="input-field">
            <h3>Description</h3>
            <input
                type="text"
                name='description'
                value={form.description}
                onChange={handleChange}
            />
            </div>

            <button className="btn">
                Update Course
            </button>
      </form>

      <Link to='/dashboard' className='back-btn'><FaFastBackward /> Back to Dashboard</Link>

    </section>
  )
}

export default UpdateCourse