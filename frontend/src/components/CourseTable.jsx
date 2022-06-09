import React from "react";

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

          <td className="people">
            <div className="people-de">
              <img src="" alt="" />
              <h5>Red</h5>
              <p></p>
            </div>
          </td>

          <td>
            <a className="edit" href="#">
              Edit
            </a>
            <a className="delete" href="#">
              Delete
            </a>
          </td>
        </tr>
      </tbody>
    </>
  );
}

export default CourseTable;
