import React, { useState } from "react";
import { FaRegQuestionCircle, FaRegSmile } from 'react-icons/fa'

function Question(props) {

  const [showAnswer, setShowAnswer] = useState(false)

  const toggleShowAnswer = () => {
    setShowAnswer(!showAnswer)
  }

  return (
    <>
      <div className="question-container">
        <div className="question">
          <h3>
            <FaRegQuestionCircle />
            Question
          </h3>
          <p>
            {props.question}
          </p>
        </div>
        <button onClick={toggleShowAnswer} className="show-btn">{showAnswer? "hide answer" : "show answer"}</button>
        <div className={showAnswer? "answer active" : "answer"}>
          <h3>
            <FaRegSmile />
            Answer
          </h3>
          <p>
            {props.answer}
          </p>
        </div>
      </div>
    </>
  );
}

export default Question;
