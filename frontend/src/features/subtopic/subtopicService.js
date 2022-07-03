import axios from 'axios'

const SUBTOPIC_URL = '/api/subtopic'

const getSubtopicsByCourseId = async(courseId) => {
    const response = await axios.get(`${SUBTOPIC_URL}/course/${courseId}`)

    return response.data
}

const subtopicService = {
    getSubtopicsByCourseId
}

export default subtopicService