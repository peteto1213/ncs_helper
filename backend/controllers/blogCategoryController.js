const asyncHandler = require('express-async-handler')
const BlogCategory = require('../models/blogCategoryModel')

/**
 * @author Pete To
 * @description Check if the user type is admin or not
 * @param {*} req 
 * @param {*} res 
 */
const checkPermission = (req, res) => {
    if(req.user.userType !== "admin"){
        res.status(401)
        throw new Error('Not authorized to get to this page')
    }
}

/**
 * @author Pete To
 * @description Get all blog categories
 * @router GET /api/blogCategory
 * @access Private
 */
const getBlogCategories = asyncHandler( async (req, res) => {
    checkPermission(req, res)
    const blogCategories = await BlogCategory.find()
    res.status(200).json(blogCategories)
})

/**
 * @author Pete To
 * @description Create a blog category
 * @router POST /api/blogCategory/:id
 * @access Private
 */
const createBlogCategory = asyncHandler( async (req, res) => {

    checkPermission(req, res)

    if(!req.body.name || !req.body.bgColor){
        res.status(400)
        throw new Error('Please add a color and name to the blog category')
    }

    const blogCategory = await BlogCategory.create({
        name: req.body.name,
        description: req.body.description,
        bgColor: req.body.bgColor
    })

    res.status(200).json(blogCategory)
})

/**
 * @author Pete To
 * @description update a blog category
 * @router PUT /api/blogCategory/:id
 * @access Private
 */
const updateBlogCategory = asyncHandler( async (req, res) => {
    checkPermission(req, res)
    //check if the blog category exists or not
    const blogCategory = await BlogCategory.findById(req.params.id)
    if(!blogCategory){
        res.status(400)
        throw new Error('Blog category not found')
    }

    const updatedBlogCategory = await BlogCategory.findByIdAndUpdate(res.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedBlogCategory)
})

/**
 * @author Pete To
 * @description delete a blog category
 * @router DELETE /api/blogCategory
 * @access Private
 */
const deleteBlogCategory = asyncHandler( async (req, res) => {
    checkPermission(req, res)
    //check if the blog category exists or not
    const blogCategory = await BlogCategory.findById(req.params.id)
    if(!blogCategory){
        res.status(400)
        throw new Error('Blog category not found')
    }
    await blogCategory.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getBlogCategories,
    createBlogCategory,
    updateBlogCategory,
    deleteBlogCategory
}