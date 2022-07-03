import React from "react";
import { FaPen } from 'react-icons/fa'

function CourseTable(props) {
  return (
    <>
      <tbody>
        <tr>
          <td className="people">
            <div className="people-de">
              <h5>CSC8011</h5>
              <p></p>
            </div>
          </td>

          <td className="people-des">
            <h5>Introduction to Software Development</h5>
            <p></p>
          </td>

          <td className="people-des">
            <h5>Java first module</h5>
          </td>

          <td>
            <a className="edit" href="#">
              <FaPen className="icon" /> Edit
            </a>
          </td>
        </tr>
      </tbody>
    </>
  );
}

export default CourseTable;
