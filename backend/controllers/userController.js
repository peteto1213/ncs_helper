const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

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
        icon: "https://cdn-icons-png.flaticon.com/512/773/773330.png",
        activationStatus: false,
        userType: "student"
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            email: user.email,
            nickname: user.nickname,
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
    const {_id, nickname, email, icon} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        nickname,
        email,
        icon
    })
})

module.exports = {
    registerUser,
    loginUser,
    getUserInfo
}