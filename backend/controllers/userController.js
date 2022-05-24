const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

/**
 * @author Pete To
 * @description Register a new user
 * @route POST /api/users
 * @access Public
 */
const registerUser =  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please complete all the fields')
    }
    //Check if the user exist
    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error('Email already be taken')
    }

    //encrypt the password coming in
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create user if successful
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

/**
 * @author Pete To
 * @description Login Authentication of a user
 * @route POST /api/users/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    //check if the user exist or not
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Incorrect Login details')
    }
})

/**
 * @author Pete To
 * @description Get user's information
 * @route GET /api/users/me
 * @access Private
 */
const getMe = asyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name: name,
        email: email
    })
})

//Generate JWT during register/login
const generateToken = (id) => {
    //payload: id (to be later retrieved), secret: environmental variable, expires in: 30days
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}