import React, { useState } from 'react'
import { FaAngleDown, FaTrashAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { deleteLearningResourceOfSubtopic } from '../features/admin/adminSlice'

function SubtopicCard(props) {
    const dispatch = useDispatch()
    const [resourcesDisplay, setResourcesDisplay] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    const { isError, message } = useSelector((state) => state.admin)

    function refreshPage(){
        window.location.reload(false)
    }

    const toggleResourcesDisplay = () => {
        setResourcesDisplay(!resourcesDisplay)
    }

    const handleDeleteResource = (resourceId) => {
        let body = {
            resourceId: resourceId,
            subtopic: props.id,
            token: user.token
        }

        dispatch(deleteLearningResourceOfSubtopic(body))

        if(!isError){
            alert('learning resources deleted successfully!')
            refreshPage()
        }else{
            alert(message)
        }
    }
 
  return (
    <>
        <div className="subtopic-card">
                <div onClick={toggleResourcesDisplay} className={resourcesDisplay ? "bar active" : "bar"}>
                    <h1><span>Subtopic</span> {props.name} </h1>
                    <FaAngleDown className='icon' />
                </div>

                <div className={resourcesDisplay ? "resources active" : "resources"}>
                    <table>
                        <thead>
                            <tr>
                                <th>Resource</th>
                                <th>Type</th>
                                <th>Link</th>
                                <th>Contributed by</th>
                            </tr>

                        </thead>

                        <tbody>
                            {/* Resources map here */}
                            {props.resources.map(resource => 
                                <tr key={resource._id}>
                                    <td>
                                        {user.userType === 'admin' &&
                                            <button className='icon' onClick={() => {handleDeleteResource(resource._id)}}>
                                                <FaTrashAlt/>
                                            </button>
                                        } 
                                        {resource.title}
                                    </td>

                                    <td>{resource.type}</td>
                                    <td><a href={resource.link} target="_blank">Click here to view</a></td>
                                    <td>{resource.user.nickname}</td>
                                </tr>
                            )}

                        </tbody>

                    </table>
                </div>
            </div>
    </>
  )
}

export default SubtopicCard