import axios from "axios";
const ALL_USERS_API = '/api/user/allUsers'
const COURSE_API = '/api/course'

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

const goalService = {
    getAllUsers,
    updateCourseByCourseId
} 

export default goalService