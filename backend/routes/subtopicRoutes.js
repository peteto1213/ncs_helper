const express = require('express')
const { getAllSubtopics, getSubtopicsByCourseId, createSubtopic, addLearningResourceToSubtopic, deleteLearningResourceOfSubtopic, updateSubtopic, deleteSubtopic, getSubtopicBySubtopicId } = require('../controllers/subtopicController')
const { protect, checkAdminPermission } = require('../middleware/authMiddleware')

const router = express.Router()

//public route
router.get('/', getAllSubtopics)
router.get('/course/:id', getSubtopicsByCourseId)
router.get('/:id', getSubtopicBySubtopicId)

//private route
router.put('/learningResource', protect, addLearningResourceToSubtopic)

//admin permission route
router.post('/', protect, checkAdminPermission, createSubtopic)
router.put('/:id', protect, checkAdminPermission, updateSubtopic)
router.delete('/:id', protect, checkAdminPermission, deleteSubtopic)
router.put('/learningResource/:id', protect, checkAdminPermission, deleteLearningResourceOfSubtopic)


module.exports = router