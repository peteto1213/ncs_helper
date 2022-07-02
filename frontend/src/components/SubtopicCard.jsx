import React, { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'

function SubtopicCard() {

    const [resourcesDisplay, setResourcesDisplay] = useState(false)

    const toggleResourcesDisplay = () => {
        setResourcesDisplay(!resourcesDisplay)
    }

  return (
    <>
        <div className="subtopic-card">
                <div onClick={toggleResourcesDisplay} className={resourcesDisplay ? "bar active" : "bar"}>
                    <h1><span>Subtopic</span> Introduction to tooling for version control </h1>
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
                            <tr>
                                <td>Git and Git Hub</td>
                                <td>Website</td>
                                <td><a href="www.github.com">www.github.com</a></td>
                                <td>Pete To</td>
                            </tr>

                        </tbody>

                    </table>
                </div>
            </div>
    </>
  )
}

export default SubtopicCard