const asyncHandler = require('express-async-handler')
const Guide = require('../models/guideModel')
const Subtopic = require('../models/subtopicModel')
const User = require('../models/userModel')

/**
 * @author Pete To
 * @description Get all guides 
 * @router GET /api/guide
 * @access Public
 */
const getAllGuides = asyncHandler(async (req, res) => {
    const guides = await Guide.find()
                            .populate('subtopic', 'name')
                            .populate('user', 'nickname icon')
                            

    res.status(200).json(guides)
})

/**
 * @author Pete To
 * @description Get guides according to subtopic 
 * @router GET /api/guide/subtopic/:id
 * @access Public
 */
const getGuidesBySubtopicId = asyncHandler(async (req, res) => {
    //Check if the subtopic exists or not
    const subtopic = await Subtopic.findById(req.params.id)
    if(!subtopic){
        res.status(404)
        throw new Error('subtopic not found')
    }

    const guides = await Guide.find({subtopic: req.params.id})
                            .populate('comments.user', 'nickname icon')
                            .populate('subtopic', 'name')
                            .populate('user', 'nickname icon')

    res.status(200).json(guides)
})

/**
 * @author Pete To
 * @description Get a guide details by guide id 
 * @router GET /api/guide/:id
 * @access Public
 */
const getGuideByGuideId = asyncHandler(async (req, res) => {
    //Check if the guide exists
    const guide = await Guide.findById(req.params.id)
                            .populate('comments.user', 'nickname icon')
                            .populate('subtopic', 'name')
                            .populate('user', 'nickname icon')
    if(!guide){
        res.status(404)
        throw new Error('Guide not found')
    }
    
    res.status(200).json(guide)
})


/**
 * @author Pete To
 * @description Create a new guide
 * @router POST /api/guide
 * @access Private
 */
const createGuide = asyncHandler(async (req, res) => {
    //Check if the user exists
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(400)
        throw new Error('User not found / Not authorized to perform this action')
    }

    //Check if the subtopic exists
    const subtopic = await Subtopic.findById(req.body.subtopic)
    if(!subtopic){
        res.status(404)
        throw new Error('Subtopic not found, please choose another subtopic to proceed')
    }

    //Check if any field is missing
    if(!req.body.name || !req.body.content || !req.body.guideQuestions){
        res.status(400)
        throw new Error('Please complete all the required fields')
    }

    const createdGuide = await Guide.create({
        name: req.body.name,
        content: req.body.content,
        guideQuestions: req.body.guideQuestions,
        likeCount: [],
        comments: [],
        subtopic: req.body.subtopic,
        user: req.user.id
    })

    res.status(201).json(createdGuide)
})

/**
 * @author Pete To
 * @description Edit a new guide
 * @router PUT /api/guide/:id
 * @access Private
 */
const editGuide = asyncHandler(async (req, res) => {
    //Check if the guide exists or not
    const guide = await Guide.findById(req.params.id)
    if(!guide){
        res.status(404)
        throw new Error('Guide not found')
    }

    //Check if the guide belongs to this user
    if(guide.user != req.user.id){
        res.status(401)
        throw new Error('Not authorized to perform this action')
    }
    
    const updatedGuide = await Guide.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedGuide)
})

/**
 * @author Pete To
 * @description Delete a new guide
 * @router DELETE /api/guide/:id
 * @access Private
 */
const deleteGuide = asyncHandler(async (req, res) => {
    //Check if the guide exists or not
    const guide = await Guide.findById(req.params.id)
    if(!guide){
        res.status(404)
        throw new Error('Guide not found')
    }

    //Check if the guide belongs to this user
    if(guide.user != req.user.id){
        res.status(401)
        throw new Error('Not authorized to perform this action')
    }
    
    await Guide.findByIdAndRemove(req.params.id)
    res.status(200).json(req.params.id)
})

/**
 * @author Pete To
 * @description Get guides according to user id
 * @router GET /api/guide/userGuide
 * @access Private
 */
const getGuidesByUserId = asyncHandler(async (req, res) => {
    //Check if the user exists
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(404)
        throw new Error('User not found')
    }

    const userGuides = await Guide.find({user: req.user.id})
                                    .populate('comments.user', 'nickname icon')
    res.status(200).json(userGuides)
})

/**
 * @author Pete To
 * @description Like a guide
 * @router PUT /api/guide/likeGuide/:id
 * @access Private
 */
const likeGuide = asyncHandler(async (req, res) => {
    //Check if the guide exists
    const guide = await Guide.findById(req.params.id)
    if(!guide){
        res.status(404)
        throw new Error('Guide nout found')
    }

    //Check if the user performing this action exists
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('Not authorized to perform this action, please login again or contact the admin')
    }

    //Check if the user has liked this guide before
    let array = guide.likeCount
    for(let i = 0; i < array.length; i++){
        if(array[i]._id == req.user.id){
            res.status(400)
            throw new Error('You have liked this guide already!')
        }
    }
    await array.push(req.user.id)

    const updatedGuide = await Guide.findByIdAndUpdate(req.params.id, {likeCount: array}, {new: true})
    res.status(200).json(updatedGuide)
})

/**
 * @author Pete To
 * @description Comment a guide
 * @router PUT /api/guide/commentGuide/:id
 * @access Private
 */
const commentGuide = asyncHandler(async (req, res) => {
    //Check if the guide exists
    const guide = await Guide.findById(req.params.id)
    if(!guide){
        res.status(404)
        throw new Error('Guide nout found')
    }

    //Check if the user performing this action exists
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('Not authorized to perform this action, please login again or contact the admin')
    }

    //Check if there is any missing field
    if(!req.body.content){
        res.status(400)
        throw new Error('Please do not leave the comments empty')
    }

    let array = guide.comments
    await array.push({
        user: req.user.id,
        content: req.body.content,
        createdAt: new Date(),
    })

    const updatedGuide = await Guide.findByIdAndUpdate(req.params.id, {comments: array}, {new: true})
                                    .populate('comments.user', 'nickname icon')

    res.status(200).json(updatedGuide)
})

/**
 * @author Pete To
 * @description Get guides by filtered guide name, case insensitive
 * @router GET /api/guide/name/:name
 * @access Public
 */
const getGuidesByFilteredGuideName = asyncHandler(async (req, res) => {
    const guides = await Guide.find({name: {'$regex': req.params.name, $options:'i'}})
                            .populate('user', 'nickname icon')

    res.status(200).json(guides)
})


module.exports = {
    getAllGuides,
    getGuidesBySubtopicId,
    getGuideByGuideId,
    createGuide,
    editGuide,
    deleteGuide,
    getGuidesByUserId,
    likeGuide,
    commentGuide,
    getGuidesByFilteredGuideName
}