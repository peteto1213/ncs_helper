import axios from 'axios'

const BLOG_URL = '/api/blog'

const getAllBlogs = async() => {
    const response = await axios.get(BLOG_URL)

    return response.data
}

const getBlogsByCategoryId = async(blogCategoryId) => {
    const response = await axios.get(`${BLOG_URL}/category/${blogCategoryId}`)

    return response.data
}

const getBlogsByFilteredBlogTitle = async(searchText) => {
    const response = await axios.get(`${BLOG_URL}/title/${searchText}`)

    return response.data
}

const getBlogByBlogId = async(blogId) => {
    const response = await axios.get(`${BLOG_URL}/${blogId}`)

    return response.data
}

const likeBlog = async(body) => {
    const response = await axios.put(`${BLOG_URL}/likeBlog`, body)

    return response.data
}

const commentBlog = async(body) => {
    const response = await axios.put(`${BLOG_URL}/commentBlog`, body)

    return response.data
}

const createBlog = async(body, token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(BLOG_URL, body, config)

    return response.data
}

const getUserBlogs = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${BLOG_URL}/user/myBlogs`, config)

    return response.data
}

const updateBlog = async(id, content, token) => {
    const config = {
        headers: {
            Authorization: `Bearer: ${token}`
        }
    }

    const response = await axios.put(`${BLOG_URL}/${id}`, content, config)

    return response.data
}

const blogService = {
    getAllBlogs,
    getBlogsByCategoryId,
    getBlogsByFilteredBlogTitle,
    getBlogByBlogId,
    likeBlog,
    commentBlog,
    createBlog,
    getUserBlogs,
    updateBlog
}

export default blogService