const express = require('express')
const { getAllSubtopics, getSubtopicsByCourseId, createSubtopic, addLearningResourceToSubtopic, deleteLearningResourceOfSubtopic, updateSubtopic, deleteSubtopic } = require('../controllers/subtopicController')
const { protect, checkAdminPermission } = require('../middleware/authMiddleware')

const router = express.Router()

//public route
router.get('/', getAllSubtopics)
router.get('/course/:id', getSubtopicsByCourseId)

//private route
router.put('/learningResource', protect, addLearningResourceToSubtopic)
router.delete('/learningResource/:id', protect, deleteLearningResourceOfSubtopic)

//admin permission route
router.post('/', protect, checkAdminPermission, createSubtopic)
router.put('/:id', protect, checkAdminPermission, updateSubtopic)
router.delete('/:id', protect, checkAdminPermission, deleteSubtopic)


module.exports = router