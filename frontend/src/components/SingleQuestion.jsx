import React, { useState } from "react";
import { FaRegQuestionCircle, FaRegSmile } from 'react-icons/fa'

function Question() {

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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            dignissimos ad nemo asperiores fugiat aspernatur?
          </p>
        </div>
        <button onClick={toggleShowAnswer} className="show-btn">{showAnswer? "hide answer" : "show answer"}</button>
        <div className={showAnswer? "answer active" : "answer"}>
          <h3>
            <FaRegSmile />
            Answer
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            neque consequatur unde, eum tempore optio.
          </p>
        </div>
      </div>
    </>
  );
}

export default Question;
