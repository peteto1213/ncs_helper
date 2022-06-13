import axios from 'axios'

const BLOG_URL = '/api/blog'

const getAllBlogs = async() => {
    const response = await axios.get(BLOG_URL)

    return response.data
}

const blogService = {
    getAllBlogs
}

export default blogService