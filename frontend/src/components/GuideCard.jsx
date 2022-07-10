import React from "react";
import { FaUser, FaCalendarCheck } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function GuideCard(guide) {
  const navigate = useNavigate()

  const navigateSingleGuide = () => {
    localStorage.setItem('viewingGuide', guide.id)
    navigate('/singleGuide', {state: {
      guide: guide
    }})
  }

  return (
    <>
      <div onClick={navigateSingleGuide} className="guide-card">
        <div className="left-element">
          <h3 className="guide-topic">{guide.name}</h3>
        </div>

        <div className="right-element">
          <h3 className="author">
            <FaUser /> {guide.author}
          </h3>
          <h3 className="date">
            <FaCalendarCheck />
            {new Date(guide.createdAt).toLocaleDateString('en-US')}
          </h3>
        </div>
      </div>
    </>
  );
}

export default GuideCard;
