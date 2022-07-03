import React from "react";
import { FaPen } from 'react-icons/fa'

function BlogTable(props) {

  const { category } = props

  return (
    <>
      <tbody>
        <tr>
          <td className="people">
            <div className="people-de">
              <h5>{category.name}</h5>
              <p></p>
            </div>
          </td>

          <td className="people-des">
            <h5>{category.description}</h5>
            <p></p>
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

export default BlogTable;
