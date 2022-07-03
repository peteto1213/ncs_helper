import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaFolderPlus, FaFastBackward, FaFileUpload } from 'react-icons/fa'

function AddResources() {

    const navigate = useNavigate()
    const navigateSingleCourse = () => {
        navigate('/singleCourse')
    }

  return (
    <section className='add-resources'>
        <div className="heading">
            <FaFolderPlus className='icon' />
            <h1>Add learning resources to <span>CSC8011</span></h1>
        </div>

        <form>
            <div className="input-field">
                <h3>Name of the resource</h3>
                <input 
                    type="text"
                    placeholder='resource name...'
                />
            </div>

            <div className="input-field">
                <h3>Link to the resource</h3>
                <input 
                    type="text"
                    placeholder='resource link...'
                />
            </div>

            <div className="input-field">
                <h3>Type of the resource</h3>
                <select name="type" id="type">
                    <option value="Documentation">Documentation</option>
                    <option value="Article">Article</option>
                    <option value="Video">Video</option>
                </select>
            </div>

            <div className="input-field">
                <h3>Related CSC8011 Subtopic</h3>
                <select name="subtopic" id="subtopic">
                    <option value="Introduction to tooling for version control">Introduction to tooling for version control</option>
                    <option value="Data Structures: Arrays, Array Lists, Maps, and Sets">Data Structures: Arrays, Array Lists, Maps, and Sets</option>
                    <option value="The Java Programming Language Architecture: JVM, JRE, and JDK">The Java Programming Language Architecture: JVM, JRE, and JDK</option>
                </select>
            </div>

            <button className='btn'><FaFileUpload /> Upload the Resource</button>
        </form>

        <button onClick={navigateSingleCourse} className='back-btn'><FaFastBackward /> Back to Course</button>
    </section>
  )
}

export default AddResources
