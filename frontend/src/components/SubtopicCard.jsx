import React, { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'

function SubtopicCard(props) {

    const [resourcesDisplay, setResourcesDisplay] = useState(false)

    const toggleResourcesDisplay = () => {
        setResourcesDisplay(!resourcesDisplay)
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
                                <tr>
                                    <td>{resource.title}</td>
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