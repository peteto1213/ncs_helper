const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //get the token from the bearer header
            token = req.headers.authorization.split(' ')[1]
            //verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //get user info from the decoded token (req.user)
            req.user = await User.findById(decoded.id).select('-password')

            next()
        }catch(error){
            console.log(error);
            //401 - not authorized
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    //if no token found
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = { protect }