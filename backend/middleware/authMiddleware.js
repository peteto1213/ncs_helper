const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

/**
 * @author Pete To
 * @description Make sure a protected route and get user info from the token
 */
const protect = asyncHandler(async (req, res, next) => {
    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //get the token from the bearer token in the header authorization section
            //token is at the second item (first is 'Bearer')
            token = req.headers.authorization.split(' ')[1]

            //Verify the token and get the protected user (decoded token)
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded);

            //Get user info from the decoded token (except password)
            req.user = await User.findById(decoded.id).select('-password')

            next() //now, be able to call next middleware if needed
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized to get the information')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = {
    protect
}