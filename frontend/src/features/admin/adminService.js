import axios from "axios";
const ALL_USERS_API = '/api/user/allUsers'
const COURSE_API = '/api/course'
const SUBTOPIC_API = '/api/subtopic'

//get all users
const getAllUsers = async(token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(ALL_USERS_API, config)

    return response.data
}

//edit course details by course id
const updateCourseByCourseId = async(body, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let courseDetails = {
        courseCode: body.courseCode,
        name: body.name,
        description: body.description,
    }

    const response = await axios.put(`${COURSE_API}/${body.id}`, courseDetails, config)

    return response.data
}

//add subtopic to a specific course (identified by course id)
const createSubtopic = async(body, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(SUBTOPIC_API, body, config)

    return response.data
}

const adminService = {
    getAllUsers,
    updateCourseByCourseId,
    createSubtopic
} 

export default adminService