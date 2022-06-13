const express = require('express')
const {getBlogs, getUserBlogs, createBlog, updateBlog, deleteBlog, getBlogsByCategoryId, getBlogByBlogId, getBlogsByFilteredBlogTitle} = require('../controllers/blogController')
const {protect} = require('../middleware/authMiddleware')

const router = express.Router() 

//Blog route that do not require protection - public read
router.get('/', getBlogs)
router.get('/category/:id', getBlogsByCategoryId)
router.get('/:id', getBlogByBlogId)
router.get('/title/:title', getBlogsByFilteredBlogTitle)

//Blog routes that requires protection - private read and write
router.get('/user/myBlogs', protect, getUserBlogs)

router.post('/', protect, createBlog)

router.put('/:id', protect, updateBlog) 

router.delete('/:id', protect, deleteBlog)

module.exports = router
