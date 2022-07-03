import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPen } from 'react-icons/fa'

function CourseTable(props) {
  const navigate = useNavigate()

  const navigateUpdateCourse = () => {
    navigate('/updateCourse', {state:{
      courseId: props.courseId,
      name: props.name,
      courseCode: props.courseCode,
      description: props.description
    }})
  }

  return (
    <>
      <tbody>
        <tr>
          <td className="people">
            <div className="people-de">
              <h5>{props.courseCode}</h5>
              <p></p>
            </div>
          </td>

          <td className="people-des">
            <h5>{props.name}</h5>
            <p></p>
          </td>

          <td className="people-des">
            <h5>{props.description}</h5>
          </td>

          <td>
            <button onClick={navigateUpdateCourse} className="edit">
              <FaPen className="icon" />
            </button>
          </td>
        </tr>
      </tbody>
    </>
  );
}

export default CourseTable;
