import axios from "axios";
const API_URL = '/api/user'

//Registration
const register = async(userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Logout
const logout = async() => {
    localStorage.removeItem('user')
}

//Login
const login = async(userData) => {
    const response = await axios.post(`${API_URL}/login`, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Update Info
const updateInfo = async(userData, token) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.put(`${API_URL}/info`, userData, config)

    return response.data
}

//Change Password by old Password
const changePasswordByOldPassword = async(userData, token) => {
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.put(`${API_URL}/password`, userData, config)

    return response.data
}

const authService = {
    register,
    logout,
    login,
    updateInfo,
    changePasswordByOldPassword
}

export default authService