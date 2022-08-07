const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')

/**
 * @author Pete To
 * @description Return a generated json web token(JWT) using the userId passed
 * @param {*} id
 * @returns 
 */
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

/**
 * @author Pete To
 * @description Register a user
 * @router POST /api/user
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
    const {email, password, nickname} = req.body

    if(!email || !password || !nickname){
        res.status(400)
        throw new Error('Please complete all the required fields')
    }

    //Check if the user has registered before by email field
    const repeatedUser = await User.findOne({email})

    if(repeatedUser){
        res.status(400)
        throw new Error('This email has been registered before, please proceed to login')
    }

    //encrypt the password using bcrypt
    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(password, salt)

    //register the user and generate a JWT token
    const user = await User.create({
        email: email,
        password: encryptedPassword,
        nickname: nickname,
        icon: "placeholder.png", //default icon on registration
        activationStatus: false,
        userType: "student"
    })
    //Check if the user creation is successful
    if(user){
        res.status(201).json({
            _id: user.id,
            email: user.email,
            nickname: user.nickname,
            icon: user.icon,
            userType: user.userType,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user registration')
    }
})

/**
 * @author Pete To
 * @description Authenticate and Login a user
 * @router POST /api/user/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    //check if any missing field in the login form
    if(!email || !password){
        res.status(400)
        throw new Error('Please enter user email and password to login')
    }
    //validate the existence of the user
    const user = await User.findOne({email})
    //validate the password with 2 parameters, 1.incoming password 2.encrypted password in db
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            email: user.email,
            nickname: user.nickname,
            icon: user.icon,
            userType: user.userType,
            token: generateToken(user._id) //token generated
        })
    }else{
        res.status(400)
        throw new Error('Invalid email or password')
    }

})

/**
 * @author Pete To
 * @description Get user information by user id decoded from the middleware protect function
 * @router GET /api/user/info
 * @access Private
 */
const getUserInfo = asyncHandler(async (req, res) => {
    const {_id, nickname, email, icon, userType} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        nickname: nickname,
        email: email,
        icon: icon,
        userType: userType
    })
})

/**
 * @author Pete To
 * @description Update user info by user id and request parameters
 * @router PUT /api/user/info
 * @access Private
 */
const updateUserInfo = asyncHandler(async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, {nickname: req.body.nickname, icon: req.file ? req.file.filename : req.user.icon}, {new: true})

    res.status(200).json({
        _id: updatedUser.id,
        email: updatedUser.email,
        nickname: updatedUser.nickname,
        icon: req.file? req.file.filename : updatedUser.icon,
        userType: updatedUser.userType,
        token: generateToken(updatedUser._id) //token generated
    })
})

/**
 * @author Pete To
 * @description Change user password by old password
 * @router PUT /api/user/password
 * @access Private
 */
const changePasswordByOldPassword = asyncHandler(async (req, res) => {
    //user info from protected route (authMiddleware)
    const { id, email } = req.user
    const { oldPassword, newPassword } = req.body
    //Check if user exists
    const user = await User.findOne({email})
    if(!user){
        res.status(404)
        throw new Error('User not found')
    }
    //Check if the all the field has been completed
    if(!oldPassword || !newPassword){
        res.status(400)
        throw new Error ('Please complete all the required field to change user password')
    }
    //Check if the old password is matching
    if(!(await bcrypt.compare(oldPassword, user.password))){
        res.status(400)
        throw new Error('Old password not matching')
    }
    //encrypt the new password using bcrypt
    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(newPassword, salt)
    //update user's with encrypted new password
    await User.findByIdAndUpdate(id, {password: encryptedPassword}, {new: true})
    res.status(200).json("Password updated successfully, please login again!")
})

/**
 * @author Pete To
 * @description Admin permission granted - Get all user's info (excluding password)
 * @router GET /api/user/allUsers
 * @access Private, Admin
 */
const getAllUsers = asyncHandler(async (req, res) => {
    const allUsers = await User.find().select('-password')

    res.status(200).json(allUsers)
})

/**
 * @author Pete To
 * @description Admin permission granted - Get all user's info (excluding password)
 * @router POST /api/user/resetPassword
 * @access Public
 */
const sendEmailToResetPassword = asyncHandler(async (req, res) => {
    transporter.sendMail(options, function(err, info){
        if(err){
            console.log(err);
            return;
        }
        console.log("Sent: " + info.response);
    })
})

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})

const options = {
    from: process.env.EMAIL,
    to: "peteto1213@gmail.com",
    subject: "Reset your password for NCSHelper Account",
    text: "Mailer text here"
}

module.exports = {
    registerUser,
    loginUser,
    getUserInfo,
    updateUserInfo,
    changePasswordByOldPassword,
    getAllUsers,
    sendEmailToResetPassword
}