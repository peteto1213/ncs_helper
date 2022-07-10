import React from "react";
import { FaUser, FaCalendarCheck } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

<<<<<<< HEAD
function GuideCard(props) {
  const navigate = useNavigate()

  const navigateSingleGuide = () => {
    navigate('/singleGuide', {state:{
      guide: props.guide
    }})
    localStorage.setItem('viewGuideId', props.guide._id)
=======
function GuideCard(guide) {
  const navigate = useNavigate()

  const navigateSingleGuide = () => {
    localStorage.setItem('viewingGuide', guide.id)
    navigate('/singleGuide', {state: {
      guide: guide
    }})
>>>>>>> 34999f37f6f05e41191d4a43900dc63ba2363502
  }

  return (
    <>
      <div onClick={navigateSingleGuide} className="guide-card">
        <div className="left-element">
<<<<<<< HEAD
          <h3 className="guide-topic">{props.guide.name}</h3>
=======
          <h3 className="guide-topic">{guide.name}</h3>
>>>>>>> 34999f37f6f05e41191d4a43900dc63ba2363502
        </div>

        <div className="right-element">
          <h3 className="author">
<<<<<<< HEAD
            <FaUser /> {props.guide.user.nickname}
          </h3>
          <h3 className="date">
            <FaCalendarCheck />
            {new Date(props.guide.createdAt).toLocaleDateString('en-US')}
=======
            <FaUser /> {guide.author}
          </h3>
          <h3 className="date">
            <FaCalendarCheck />
            {new Date(guide.createdAt).toLocaleDateString('en-US')}
>>>>>>> 34999f37f6f05e41191d4a43900dc63ba2363502
          </h3>
        </div>
      </div>
    </>
  );
}

export default GuideCard;
