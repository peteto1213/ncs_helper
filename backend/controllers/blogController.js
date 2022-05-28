const asyncHandler = require('express-async-handler')

/**
 * @author Pete To
 * @description Get all blogs
 * @router GET /api/blog
 * @access Private
 */
const getBlogs = asyncHandler( async (req, res) => {
    res.status(200).json({message: "Hello"})
})

/**
 * @author Pete To
 * @description Create a new blog
 * @router POST /api/blog
 * @access Private
 */
const createBlog = asyncHandler( async (req, res) => {
    res.status(201).json({message: "blog created"})
})

/**
 * @author Pete To
 * @description update a blog
 * @router PUT /api/blog/:id
 * @access Private
 */
const updateBlog = asyncHandler( async (req, res) => {
    res.status(200).json({message: `blogId: ${req.params.id} successfully updated`})
})

/**
 * @author Pete To
 * @description Delete a blog
 * @router DELETE /api/blog/:id
 * @access Private
 */
const deleteBlog = asyncHandler( async (req, res) => {
    res.status(200).json({message: `blogId: ${req.params.id} successfully deleted`})
})

module.exports = {
    getBlogs,
    createBlog,
    updateBlog,
    deleteBlog
}