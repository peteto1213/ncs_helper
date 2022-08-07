const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getUserInfo, updateUserInfo, changePasswordByOldPassword, getAllUsers, sendEmailToResetPassword} = require('../controllers/userController')
const {protect, checkAdminPermission} = require('../middleware/authMiddleware')
const {upload} = require('../middleware/uploadMiddleware')

//Public routes
//Register a user
router.post('/', registerUser)
//Login a user
router.post('/login', loginUser)

//Private routes
//Get user info by user id - get from the JWT
router.get('/info', protect, getUserInfo)
//Upon admin permission granted - Get all user's info
router.get('/allUsers', protect, checkAdminPermission, getAllUsers)
//Update user information
router.put('/info', upload.single('icon'), protect, updateUserInfo)
//Change user's password by old password
router.put('/password', protect, changePasswordByOldPassword)

//Forget password (reset)
router.post('/resetPassword', sendEmailToResetPassword)

module.exports = router