const express = require('express')
const { getAllGuides, getGuidesBySubtopicId, createGuide, editGuide, deleteGuide, getGuidesByUserId, likeGuide, commentGuide, getGuideByGuideId, getGuidesByFilteredGuideName } = require('../controllers/guideController')
const { protect, checkAdminPermission } = require('../middleware/authMiddleware')

const router = express.Router()

//Public access routes
router.get('/', getAllGuides)
router.get('/subtopic/:id', getGuidesBySubtopicId)
router.get('/:id', getGuideByGuideId)
router.get('/name/:name', getGuidesByFilteredGuideName)

//Private access routes
router.post('/', protect, createGuide)
router.put('/:id', protect, editGuide)
router.delete('/:id', protect, deleteGuide)
router.get('/userGuide', protect, getGuidesByUserId)

router.put('/likeGuide/:id', protect, likeGuide)
router.put('/commentGuide/:id', protect, commentGuide)

module.exports = router