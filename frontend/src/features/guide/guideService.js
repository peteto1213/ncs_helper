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

const guideService = {
    getAllGuides,
    getGuidesBySubtopicId,
    getGuidesByFilteredGuideName,
    getGuideByGuideId
}

export default guideService