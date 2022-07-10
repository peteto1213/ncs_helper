import axios from 'axios'

const GUIDE_API = "/api/guide"

const getAllGuides = async() => {
    const response = await axios.get(GUIDE_API)

    return response.data
}

const getGuidesBySubtopicId = async(subtopic) => {

    const response = await axios.get(`${GUIDE_API}/subtopic/${subtopic}`)

    return response.data
}

const getGuidesByFilteredGuideName = async(searchText) => {
    const response = await axios.get(`${GUIDE_API}/name/${searchText}`)

    return response.data
}

const getGuideByGuideId = async(id) => {
    const response = await axios.get(`${GUIDE_API}/${id}`)

    return response.data
}

const likeGuide = async(guideId, token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(`${GUIDE_API}/likeGuide/${guideId}`, {id: guideId}, config)

    return response.data
}

const commentGuide = async(guideId, content, token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(`${GUIDE_API}/commentGuide/${guideId}`, {content: content}, config)

    return response.data
}

const guideService = {
    getAllGuides,
    getGuidesBySubtopicId,
    getGuidesByFilteredGuideName,
    getGuideByGuideId,
    likeGuide,
    commentGuide
}

export default guideService