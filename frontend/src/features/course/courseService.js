import axios from 'axios'

const COURSE_URL = '/api/course'

const getAllCourses = async() => {
    const response = await axios.get(COURSE_URL)

    return response.data
}

const getCourseByCourseId = async(courseId) => {
    const response = await axios.get(`${COURSE_URL}/${courseId}`)

    return response.data
}

const courseService = {
    getAllCourses,
    getCourseByCourseId
}

export default courseService