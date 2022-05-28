const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getUserInfo} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)

router.post('/login', loginUser)

//User id is get from the JWT
router.get('/info', protect, getUserInfo)

module.exports = router