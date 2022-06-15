const asyncHandler = require('express-async-handler')
const Blog = require('../models/blogModel')
const User = require('../models/userModel')

/**
 * @author Pete To
 * @description Get all blogs from all users
 * @router GET /api/blog
 * @access Public
 */
const getBlogs = asyncHandler( async (req, res) => {
    const blogs = await Blog.find()
                            .populate('user', 'nickname icon')
                            .populate('blogCategory', 'name')
                            .populate('comments.user', 'nickname icon')

    res.status(200).json(blogs)
})

/**
 * @author Pete To
 * @description Get blogs from a specific user (matched by user id)
 * @router GET /api/blog/user/myBlogs
 * @access Private
 */
const getUserBlogs = asyncHandler( async (req, res) => {
    //find all blogs that belong to the userid
    const blogs = await Blog.find({user: req.user.id})
                            .populate('user', 'nickname icon')
                            .populate('blogCategory', 'name')

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
        likeCount: [],
        comments: [],
        blogCategory: req.body.blogCategory,
        user: req.user.id,
    }).populate('user', 'nickname icon').populate('blogCategory', 'name').populate('comments.user', 'nickname icon')

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
    }).populate('user', 'nickname icon').populate('blogCategory', 'name').populate('comments.user', 'nickname icon')

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

/**
 * @author Pete To
 * @description Get all blogs that belong to a category id
 * @router GET /api/blog/category/:id
 * @access Public
 */
const getBlogsByCategoryId = asyncHandler(async(req, res) => {
    //check if id is passed or not
    if(!req.params.id){
        res.status(400)
        throw new Error('Please pass a blog id to search for blogs')
    }
    const blogs = await Blog.find({blogCategory: req.params.id})
                            .populate('user', 'nickname icon')
                            .populate('blogCategory', 'name')
                            .populate('comments.user', 'nickname icon')

    //check if any blogs for this category 
    if(!blogs){
        res.status(200).json("No blogs found for this category")
    }
    res.status(200).json(blogs)
})

/**
 * @author Pete To
 * @description Get a blog by blog id
 * @router GET /api/blog/:id
 * @access Public
 */
const getBlogByBlogId = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id)
                            .populate('user', 'nickname icon')
                            .populate('blogCategory', 'name')
                            .populate('comments.user', 'nickname icon')
    // Check if the blog exists or not
    if(!blog){
        res.status(404)
        throw new Error('Blog not found')
    }else{
        res.status(200).json(blog)
    }
})

/**
 * @author Pete To
 * @description Get blogs by filtered blog title, case insensitive
 * @router GET /api/blog/title/:title
 * @access Public
 */
const getBlogsByFilteredBlogTitle = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({title: {'$regex': req.params.title, $options:'i'}})
                            .populate('user', 'nickname icon')
                            .populate('blogCategory', 'name')
                            .populate('comments.user', 'nickname icon')

    res.status(200).json(blogs)
})

/**
 * @author Pete To
 * @description Like a blog post, one user can only like once
 * @router PUT /api/blog/likeBlog
 * @access Public
 */
const likeBlog = asyncHandler(async (req, res) => {
    //Check if the targeted blog exists or not
    const blog = await Blog.findById(req.body.id)
    const user = req.body.user

    if(!blog){
        res.status(400)
        throw new Error("Blog not found")
    }
    //Check if user id exist
    if(!user){
        res.status(400)
        throw new Error("Please login to perform this action")
    }
    //Check if the user has already liked the post
    let array = blog.likeCount
    for(let i = 0; i < array.length; i++){
        if(array[i]._id == user){
            res.status(400)
            throw new Error("You have already liked this blog")
        }
    }
    await array.push(user)
    
    const likedBlog = await Blog.findByIdAndUpdate(req.body.id, {likeCount: array}, {new: true})
                                .populate('user', 'nickname icon')
                                .populate('blogCategory', 'name')
                                .populate('comments.user', 'nickname icon')

    res.status(200).json(likedBlog)
})

/**
 * @author Pete To
 * @description Comment a blog post
 * @router PUT /api/blog/commentBlog
 * @access Public
 */
const commentBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.body.id)
    const user = req.body.user
    const content = req.body.content
    //Check if the targeted blog exists or not
    if(!blog){
        res.status(400)
        throw new Error("Blog not found")
    }
    //Check if user id exist
    if(!user){
        res.status(400)
        throw new Error("You have to login to perform this action")
    }
    //Check if content of the comment exist
    if(!content){
        res.status(400)
        throw new Error("Content of comment is empty")
    }

    let array = blog.comments
    await array.push({
        user: user,
        content: content,
        createdAt: new Date()
    })

    const commentedBlog = await Blog.findByIdAndUpdate(req.body.id, {comments: array}, {new: true})
                                .populate('user', 'nickname icon')
                                .populate('blogCategory', 'name')
                                .populate('comments.user', 'nickname icon')
    
    res.status(200).json(commentedBlog)
})

module.exports = {
    getBlogs,
    getUserBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogsByCategoryId,
    getBlogByBlogId,
    getBlogsByFilteredBlogTitle,
    likeBlog,
    commentBlog
}