import React from "react";
import { FaUser, FaCalendarCheck } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function GuideCard(props) {
  const navigate = useNavigate()

  const navigateSingleGuide = () => {
    navigate(`/singleGuide/${props.id}`, {state:{
      guide: props.guide
    }})
    localStorage.setItem('viewGuideId', props.guide._id)
  }

  return (
    <>
      <div onClick={navigateSingleGuide} className="guide-card">
        <div className="left-element">
          <h3 className="guide-topic">{props.guide.name}</h3>
        </div>

        <div className="right-element">
          <h3 className="author">
            <FaUser /> {props.guide.user.nickname}
          </h3>
          <h3 className="date">
            <FaCalendarCheck />
            {new Date(props.guide.createdAt).toLocaleDateString('en-US')}
          </h3>
        </div>
      </div>
    </>
  );
}

export default GuideCard;
