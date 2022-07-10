import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { FaPen, FaTrashAlt, FaThumbsUp, FaTag } from "react-icons/fa";
import guideImage from '../resources/guide.jpg';

import ModalBox from "./ModalBox";

function MyGuideCard() {
    const navigate = useNavigate()
  const [modalState, setModalState] = useState(false)


  const deleteGuide = () => {  
    setModalState(true)
  }

  const navigateEditGuide = () => {
    navigate('/editGuide')
  }

  return (
    <>
      <div className="myblog-card">
        {modalState && 
          <ModalBox 
            action={`delete guide - "guide name"`}
            deleteType='guide'
          />
        }
        <div className="like">
            <h2>0</h2>
            <span> </span>
            <FaThumbsUp />
        </div>

        <img src={guideImage} alt="" />

        <h3>
          Title: <span>Title</span>
        </h3>

        <p>
          <FaTag />Subtopic: subtopic
        </p>

        <h4 className="date">Created At: date</h4>
        <h4 className="date update">Updated At: date</h4>

        <div className="actions">
          <button onClick={navigateEditGuide} className="edit-btn">
            <FaPen className="icon" />
            edit
          </button>
          <button onClick={deleteGuide} className="delete-btn">
            <FaTrashAlt className="icon" />
            delete
          </button>
        </div>
      </div>
    </>
  );
}

export default MyGuideCard;
