import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaRegHandshake, FaSearch, FaPlus, FaCaretRight, FaStream } from 'react-icons/fa'
import GuideCard from '../components/GuideCard'

import { useSelector, useDispatch } from 'react-redux'
import { getAllGuides, getGuidesBySubtopicId, getGuidesByFilteredGuideName, reset } from '../features/guide/guideSlice'
import { getAllSubtopics } from '../features/subtopic/subtopicSlice'
import Spinner from '../components/Spinner'

function AllGuides() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { guides, isError, isLoading, message } = useSelector((state) => state.guide)
    const { allSubtopics } = useSelector((state) => state.subtopic)
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if(!user){
            navigate('/login')
        }

        dispatch(getAllGuides())
        dispatch(getAllSubtopics())

        if(isError){
            alert(message)
        }
    }, [user, navigate, isError, alert, message, dispatch])

    const filterGuidesBySubtopicId = (id) => {
        dispatch(getGuidesBySubtopicId(id))
        setSidebarDisplay(false)
    }

    const [searchText, setSearchText] = useState("")
    const handleSearchTextChange = (event) => {
        const { value } = event.target
        setSearchText(value)
    }

    const filterGuideByGuideName = () => {
        if(searchText){
            dispatch(getGuidesByFilteredGuideName(searchText))
        }else{
            dispatch(getAllGuides())
        }
        setSidebarDisplay(false)
    }

    const cancelAllFilters = () => {
        dispatch(getAllGuides())
        setSidebarDisplay(false)
    }

    const [sidebarDisplay, setSidebarDisplay] = useState(false)

    const toggleSidebar = () => {
        setSidebarDisplay(!sidebarDisplay)
    }

    const navigateCreateGuide = () => {
        navigate('/createGuide')
    }

    if(isLoading){
        return <Spinner />
    }

  return (
    <section className='all-guides'>
        <div className="heading">
            <FaRegHandshake className='icon' />
            <h1>Collaboration Guide</h1>
            <FaStream onClick={toggleSidebar} id='stream' />
        </div>

        <div className="content">
            <div className={sidebarDisplay? "sidebar active" : "sidebar"}>
                <div className="search-bar">
                    <input 
                        type="text"
                        value={searchText}
                        onChange={handleSearchTextChange}
                        placeholder='search guide name...'
                    />
                    <FaSearch
                        onClick={filterGuideByGuideName}
                        className='icon' 
                    />
                </div>

                <div className="category-bar">
                    <h3>Subtopics</h3>
                    <h3 onClick={cancelAllFilters} className="category"><FaCaretRight />All Subtopics</h3>
                    {/* subtopics map here */}
                    {(allSubtopics.length !== 0) ?
                        allSubtopics.map(subtopic =>
                            <h3 
                                key={subtopic._id} 
                                onClick={() => {filterGuidesBySubtopicId(subtopic._id)}}
                                className="category"
                            >
                                <FaCaretRight />{subtopic.name}
                            </h3>
                        )
                        :
                        <>
                        </>
                    }
                </div>
            </div>

            <div className="guide-container">
                <button onClick={navigateCreateGuide} className='btn'><FaPlus /> contribute new guide</button>

                {/* Guide card maps here */}
                {(guides.length !== 0) ?
                    guides.map(guide =>
                        <GuideCard
                            key={guide._id}
<<<<<<< HEAD
                            guide={guide}
=======
                            id = {guide._id}
                            name={guide.name}
                            content={guide.content}
                            guideQuestions={guide.guideQuestions}
                            likeCount={guide.likeCount}
                            comments={guide.comments}
                            createdAt={guide.createdAt}
                            author = {guide.user.nickname}
                            icon = {guide.user.icon}
                            subtopic = {guide.subtopic}
>>>>>>> 34999f37f6f05e41191d4a43900dc63ba2363502
                        />
                    )
                    :
                    <>
                        <h1 className='no-wordings'>Oops! There is currently no blog post related to this blog name/category, please check again later!</h1>
                    </>
                }

            </div>

        </div>
    </section>
  )
}

export default AllGuides