const express = require('express')
const {getBlogCategories, createBlogCategory, updateBlogCategory, deleteBlogCategory} = require('../controllers/blogCategoryController')
const {protect} = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', protect, getBlogCategories)

router.post('/', protect, createBlogCategory)

router.put('/:id', protect, updateBlogCategory)

router.delete('/:id', protect, deleteBlogCategory)

module.exports = router
