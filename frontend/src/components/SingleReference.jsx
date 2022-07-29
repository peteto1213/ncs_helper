import React from 'react'

function SingleReference(props) {
  return (
    <>
        <div className="reference-container">
            <div className="single-reference">
                <h3 className='title'>{props.title}</h3>
                <p className="description">{props.description}</p>
            </div>
        </div>
    </>
  )
}

export default SingleReference