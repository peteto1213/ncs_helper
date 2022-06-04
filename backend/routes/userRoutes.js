const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getUserInfo, updateUserInfo} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')
const {upload} = require('../middleware/uploadMiddleware')

router.post('/', registerUser)

router.post('/login', loginUser)

//User id is get from the JWT
router.get('/info', protect, getUserInfo)

//update user information
router.put('/info', upload.single('icon'), protect, updateUserInfo)

module.exports = router