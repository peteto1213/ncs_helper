const express = require('express')
const { getAllCourses, createCourse, updateCourse, deleteCourse, getCourseByCourseId } = require('../controllers/courseController')
const { protect, checkAdminPermission } = require('../middleware/authMiddleware')

const router = express.Router()

//public route
router.get('/', getAllCourses)
router.get('/:id', getCourseByCourseId)

//private, admin route
router.post('/', protect, checkAdminPermission, createCourse)

router.put('/:id', protect, checkAdminPermission, updateCourse)

router.delete('/:id', protect, checkAdminPermission, deleteCourse)

module.exports = router