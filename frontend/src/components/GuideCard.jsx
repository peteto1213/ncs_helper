import React from "react";
import { FaUser, FaCalendarCheck } from 'react-icons/fa'

function GuideCard() {
  return (
    <>
      <div className="guide-card">
        <div className="left-element">
          <h3 className="guide-topic">Lorem ipsum dolor sit.</h3>
        </div>

        <div className="right-element">
          <h3 className="author">
            <FaUser /> Author
          </h3>
          <h3 className="date">
            <FaCalendarCheck />
            09/07/2022
          </h3>
        </div>
      </div>
    </>
  );
}

export default GuideCard;
