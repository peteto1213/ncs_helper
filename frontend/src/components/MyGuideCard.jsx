import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { FaPen, FaTrashAlt, FaThumbsUp, FaTag } from "react-icons/fa";
import guideImage from '../resources/guide.jpg';

import ModalBox from "./ModalBox";

function MyGuideCard(guide) {
    const navigate = useNavigate()
  const [modalState, setModalState] = useState(false)
  const { id, name, subtopic, createdAt, updatedAt, likeCount } = guide


  const deleteGuide = () => {  
    setModalState(true)
  }

  const navigateEditGuide = () => {
    localStorage.setItem('viewGuideId', id)
    navigate('/editGuide', {state:{
      guide: guide
    }})
  }

  return (
    <>
      <div className="myblog-card">
        {modalState && 
          <ModalBox 
            action={`delete guide - ${name}`}
            deleteType='guide'
            id={id}
          />
        }
        <div className="like">
            <h2>{likeCount}</h2>
            <span> </span>
            <FaThumbsUp />
        </div>

        <img src={guideImage} alt="" />

        <h3>
          Title: <span>{name}</span>
        </h3>

        <p>
          <FaTag />Subtopic: {subtopic}
        </p>

        <h4 className="date">Created At: {new Date(createdAt).toLocaleString('en-US')}</h4>
        <h4 className="date update">Last Update: {new Date(updatedAt).toLocaleString('en-US')}</h4>

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
