import React from "react";
import { useNavigate } from 'react-router-dom'

function CourseCard(props) {
  const navigate = useNavigate()

  const navigateCourseDetails = () => {
    localStorage.setItem('viewCourseId', props.courseId)
    navigate(`/singleCourse/${props.courseId}`)
  }

  return (
    <>
      <div onClick={navigateCourseDetails} className="course-card">
        <h3>{props.courseCode} - {props.name}</h3>
        <p>{props.description}</p>
        <button className="btn">Browse subtopics</button>
      </div>
    </>
  );
}

export default CourseCard;
