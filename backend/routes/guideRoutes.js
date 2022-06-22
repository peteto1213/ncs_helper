const express = require('express')
const { getAllGuides, getGuidesBySubtopicId, createGuide } = require('../controllers/guideController')
const { protect, checkAdminPermission } = require('../middleware/authMiddleware')

const router = express.Router()

//Public access routes
router.get('/', getAllGuides)
router.get('/subtopic', getGuidesBySubtopicId)

//Private access routes
router.post('/', protect, createGuide)

module.exports = router