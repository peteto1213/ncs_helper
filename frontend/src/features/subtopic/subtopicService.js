import axios from 'axios'

const SUBTOPIC_URL = '/api/subtopic'

const getAllSubtopics = async() => {
    const response = await axios.get(SUBTOPIC_URL)

    return response.data
}

const getSubtopicsByCourseId = async(courseId) => {
    const response = await axios.get(`${SUBTOPIC_URL}/course/${courseId}`)

    return response.data
}

const addLearningResourceToSubtopic = async(body, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(`${SUBTOPIC_URL}/learningResource`, body, config)

    return response.data
}

const subtopicService = {
    getSubtopicsByCourseId,
    addLearningResourceToSubtopic,
    getAllSubtopics
}

export default subtopicService