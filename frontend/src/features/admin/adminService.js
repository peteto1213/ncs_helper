import axios from "axios";
const ALL_USERS_API = '/api/user/allUsers'

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

const goalService = {
    getAllUsers
} 

export default goalService