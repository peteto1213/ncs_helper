import React from "react";
import { useEffect } from "react";

function UserTable(props) {
  //Exception handling for no user data
  useEffect(() => {
    if (!props.user) {
      props.user = null;
      alert("No user data found");
    }
  }, []);
  return (
    <>
      <tbody>
        <tr>
          <td className="people">
            <img
              src={`${process.env.PUBLIC_URL}/userIcons/${props.user.icon}`}
              alt=""
            />
            <div className="people-de">
              <h5>{props.user.nickname}</h5>
              <p></p>
            </div>
          </td>

          <td className="people-des">
            <h5>{props.user.email}</h5>
            <p></p>
          </td>

          <td className={props.user.activationStatus ? "active" : "inactive"}>
            <p>{props.user.activationStatus ? "active" : "inactive"}</p>
          </td>

          <td className="role">
            <p>{props.user.userType}</p>
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

export default UserTable;
