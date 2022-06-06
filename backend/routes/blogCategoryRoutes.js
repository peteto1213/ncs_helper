const express = require('express')
const {getBlogCategories, createBlogCategory, updateBlogCategory, deleteBlogCategory} = require('../controllers/blogCategoryController')
const {protect, checkAdminPermission} = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', protect, checkAdminPermission, getBlogCategories)

router.post('/', protect, checkAdminPermission, createBlogCategory)

router.put('/:id', protect, checkAdminPermission, updateBlogCategory)

router.delete('/:id', protect, checkAdminPermission, deleteBlogCategory)

module.exports = router
