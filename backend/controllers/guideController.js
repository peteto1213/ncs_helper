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

    res.status(200).json(guides)
})

/**
 * @author Pete To
 * @description Get guides according to subtopic 
 * @router GET /api/guide/subtopic
 * @access Public
 */
const getGuidesBySubtopicId = asyncHandler(async (req, res) => {
    //Check if the subtopic exists or not
    const subtopic = await Subtopic.findById(req.body.subtopic)
    if(!subtopic){
        res.status(404)
        throw new Error('subtopic not found')
    }

    const guides = await Guide.find({subtopic: req.body.suptopic})

    res.status(200).json(guides)
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
        throw new Error('Not authorized to perform this action')
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

module.exports = {
    getAllGuides,
    getGuidesBySubtopicId,
    createGuide
}