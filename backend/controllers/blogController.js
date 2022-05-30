const asyncHandler = require('express-async-handler')
const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const BlogCategory = require('../models/blogCategoryModel')

/**
 * @author Pete To
 * @description Get all blogs from all users
 * @router GET /api/blog
 * @access Public
 */
const getBlogs = asyncHandler( async (req, res) => {
    const blogs = await Blog.find()

    res.status(200).json(blogs)
})

/**
 * @author Pete To
 * @description Get blogs from a specific user (matched by user id)
 * @router GET /api/blog
 * @access Private
 */
const getUserBlogs = asyncHandler( async (req, res) => {
    //find all blogs that belong to the userid
    const blogs = await Blog.find({user: req.user.id})

    res.status(200).json(blogs)
})

/**
 * @author Pete To
 * @description Create a new blog (matched by user id)
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
        blogCategory: req.body.blogCategory,
        user: req.user.id,
        author: req.user.nickname,
        icon: req.user.icon
    })

    res.status(200).json(blog)
})

/**
 * @author Pete To
 * @description update a blog (matched by user id)
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
    //Check if the user exists or not
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(400)
        throw new Error('The User does not exist')
    }
    //Check if the blog belongs to this user or not
    if(blog.user.toString() !== user.id){
        res.status(401)
        throw new Error('Not authorized to update this blog')
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedBlog)
})

/**
 * @author Pete To
 * @description Delete a blog (matched by user id)
 * @router DELETE /api/blog/:id
 * @access Private
 */
const deleteBlog = asyncHandler( async (req, res) => {
    //Check if the targeted blog exists or not
    const blog = await Blog.findById(req.params.id)

    if(!blog){
        res.status(400)
        throw new Error("Blog not found")
    }
    //Check if the user exists or not
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(400)
        throw new Error('The User does not exist')
    }
    //Check if the blog belongs to this user or not
    if(blog.user.toString() !== user.id){
        res.status(401)
        throw new Error('Not authorized to update this blog')
    }

    await blog.remove()
    
    res.status(200).json({id: req.params.id})
})

const getBlogsByCategoryId = asyncHandler(async(req, res) => {
    const blogs = await Blog.find({blogCategory: req.body.id})

    res.status(200).json(blogs)
})

module.exports = {
    getBlogs,
    getUserBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogsByCategoryId
}