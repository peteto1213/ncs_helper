import React from "react";
import { useEffect } from "react";
import { FaPen, FaBan } from 'react-icons/fa'

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

          <td className="button-role">
            <a className="edit" href="#">
              <FaPen className="icon" /> Edit
            </a>
            <a className="delete" href="#">
              <FaBan className="icon" /> Ban
            </a>
          </td>
        </tr>
      </tbody>
    </>
  );
}

export default UserTable;
