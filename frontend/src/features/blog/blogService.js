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

const blogService = {
    getAllBlogs,
    getBlogsByCategoryId,
    getBlogsByFilteredBlogTitle,
    getBlogByBlogId
}

export default blogService