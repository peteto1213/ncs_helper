import React, { useState, useEffect } from 'react'
import { FaPencilAlt, FaRegPlusSquare } from "react-icons/fa"
import MyGuideCard from '../components/MyGuideCard'
import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { getGuidesByUserId } from '../features/guide/guideSlice'

function MyGuide() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userGuides, isError, isLoading, message } = useSelector((state) => state.guide)
    const { user } = useSelector((state) => state.auth)
    
    useEffect(() => {
        if(!user){
            navigate('/login')
        }

        dispatch(getGuidesByUserId())

        if(isError){
            alert(message)
        }
    }, [user, navigate, dispatch, isError, message])

    const navigateCreateGuide = () =>{
        navigate('/createGuide')
    }

    if(isLoading){
        return <Spinner />
    }

  return (
    <section className='my-guide'>
        <div className="heading">
            <FaPencilAlt />
            My Guides
        </div>

        <button onClick={navigateCreateGuide} className="create-btn">
            <FaRegPlusSquare />Contribute a new guide
        </button>

        {(userGuides.length !== 0) ?
            <div className="guide-container">
            {
                userGuides.map((guide) => (
                    <MyGuideCard
                        key={guide._id}
                        id = {guide._id}
                        name = {guide.name}
                        subtopic = {guide.subtopic.name}
                        createdAt = {guide.createdAt}
                        updatedAt = {guide.updatedAt}
                        likeCount = {guide.likeCount.length}
                    />
                ))
            }
            </div>
            :
            <>
                <h1 className="no-wordings">You haven't created any guides yet!</h1>
            </> 
        }
    </section>
  )
}

export default MyGuide