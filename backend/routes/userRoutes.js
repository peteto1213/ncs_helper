const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getUserInfo, updateUserInfo, changePasswordByOldPassword} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')
const {upload} = require('../middleware/uploadMiddleware')

router.post('/', registerUser)

router.post('/login', loginUser)

//User id is get from the JWT
router.get('/info', protect, getUserInfo)

//update user information
router.put('/info', upload.single('icon'), protect, updateUserInfo)

//change user's password by old password
router.put('/password', protect, changePasswordByOldPassword)

module.exports = router