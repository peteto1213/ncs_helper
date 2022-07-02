import React from "react";

function CourseCard() {

  const navigateCourseDetails = () => {
    console.log("navigated");
  }

  return (
    <>
      <div onClick={navigateCourseDetails} className="course-card">
        <h3>CSC8011 - Introduction to Software Development</h3>
        <p>1st Java module</p>
        <button className="btn">Browse subtopics</button>
      </div>
    </>
  );
}

export default CourseCard;
