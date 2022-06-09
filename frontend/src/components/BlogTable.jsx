import React from "react";

function BlogTable() {
  return (
    <>
      <tbody>
        <tr>
          <td className="people">
            <div className="people-de">
              <h5>Leisure</h5>
              <p></p>
            </div>
          </td>

          <td className="people-des">
            <h5>Things besides techical skills</h5>
            <p></p>
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

export default BlogTable;
