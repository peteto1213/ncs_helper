const asyncHandler = require('express-async-handler')
//created Blog Model 
const Blog = require('../models/blogModel')

/**
 * @author Pete To
 * @description Get all blogs from all users
 * @router GET /api/blog
 * @access Private
 */
const getBlogs = asyncHandler( async (req, res) => {
    const blogs = await Blog.find()

    res.status(200).json(blogs)
})

const getUserBlogs = asyncHandler( async (req, res) => {
    const blogs = await Blog.find()

    res.status(200).json(blogs)
})

/**
 * @author Pete To
 * @description Create a new blog
 * @router POST /api/blog
 * @access Private
 */
const createBlog = asyncHandler( async (req, res) => {
    if(!req.body.title || !req.body.content){
        res.status(400)
        throw new Error("Please add a title and some content for your blog")
    }

    const blog = await Blog.create({
        title: req.body.title,
        content: req.body.content,
        likeCount: 0,
        blogCategory: req.body.blogCategory
    })

    res.status(200).json(blog)
})

/**
 * @author Pete To
 * @description update a blog
 * @router PUT /api/blog/:id
 * @access Private
 */
const updateBlog = asyncHandler( async (req, res) => {
    //Check if the targeted blog exists or not
    const blog = await Blog.findById(req.params.id)

    if(!blog){
        res.status(400)
        throw new Error("Blog not found")
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedBlog)
})

/**
 * @author Pete To
 * @description Delete a blog
 * @router DELETE /api/blog/:id
 * @access Private
 */
const deleteBlog = asyncHandler( async (req, res) => {
    //Check if the blog exists or not
    const blog = await Blog.findById(req.params.id)
    if(!blog){
        res.status(400)
        throw new Error("Blog nout found")
    }

    await blog.remove()
    
    res.status(200).json({id: req.params.id})
})

module.exports = {
    getBlogs,
    getUserBlogs,
    createBlog,
    updateBlog,
    deleteBlog
}