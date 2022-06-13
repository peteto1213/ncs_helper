import axios from 'axios';

const BLOG_CATEGEORY_URL = '/api/blogCategory'

const getAllBlogCategories = async() => {
    const response = await axios.get(BLOG_CATEGEORY_URL)

    return response.data
}

const blogCategoryService = {
    getAllBlogCategories
}

export default blogCategoryService