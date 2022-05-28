const express = require('express')
const router = express.Router() 
const {getBlogs, getUserBlogs, createBlog, updateBlog, deleteBlog} = require('../controllers/blogController')

router.get('/', getBlogs)

router.get('/', getUserBlogs)

router.post('/', createBlog)

router.put('/:id', updateBlog) 

router.delete('/:id', deleteBlog)

module.exports = router
