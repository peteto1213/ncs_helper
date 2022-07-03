const asyncHandler = require('express-async-handler')
const Subtopic = require('../models/subtopicModel')
const Course = require('../models/courseModel')

/**
 * @author Pete To
 * @description Get all subtopics
 * @router GET /api/subtopic
 * @access Public
 */
const getAllSubtopics = asyncHandler(async (req, res) => {
    const subtopics = await Subtopic.find()
                                    .populate('course', 'courseCode name')
                                    .populate('resources.user', 'nickname icon')

    res.status(200).json(subtopics)
})

/**
 * @author Pete To
 * @description Get subtopics according to course id
 * @router GET /api/subtopic/course/:id
 * @access Public
 */
const getSubtopicsByCourseId = asyncHandler(async (req, res) => {
    //Check if the course exists or not
    const course = await Course.findById(req.params.id)
    if(!course){
        res.status(404)
        throw new Error('Course not found')
    }

    const subtopics = await Subtopic.find({course: req.params.id})
                                    .populate('course', 'courseCode name')
                                    .populate('resources.user', 'nickname icon')

    res.status(200).json(subtopics)
})

/**
 * @author Pete To
 * @description Get a subtopic by subtopic id
 * @router GET /api/subtopic/:id
 * @access Public
 */
const getSubtopicBySubtopicId = asyncHandler(async (req, res) => {
    //check if the subtopic exists
    const subtopic = await Subtopic.findById(req.params.id)
    if(!subtopic){
        res.status(404)
        throw new Error('Subtopic not found')
    }

    res.status(200).json(subtopic)
})

/**
 * @author Pete To
 * @description Add a learning resource to the subtopic
 * @router PUT /api/subtopic/learningResource
 * @access Private
 */
const addLearningResourceToSubtopic = asyncHandler(async (req, res) => {
    //Check if the subtopic exists or not
    const subtopic = await Subtopic.findById(req.body.subtopic)
    if(!subtopic){
        res.status(404)
        throw new Error('Subtopic not found')
    }

    //Check if any field is missing
    if(!req.body.title || !req.body.link || !req.body.type || !req.body.subtopic){
        res.status(400)
        throw new Error('Please complete all the required fields')
    }

    //Check if the title duplicates existing resources or not 
    const resources = subtopic.resources
    for(let i = 0; i < resources.length; i++){
        if(resources[i].title === req.body.title){
            res.status(400)
            throw new Error('This title has been posted before, please use another title')
        }
    }

    await resources.push({
        title: req.body.title,
        link: req.body.link,
        type: req.body.type,
        user: req.user.id
    })

    const updatedSubtopic = await Subtopic.findByIdAndUpdate(req.body.subtopic, {resources: resources}, {new: true})

    res.status(200).json(updatedSubtopic)
})

/**
 * @author Pete To
 * @description Delete a learning resource of the subtopic
 * @router DELETE /api/subtopic/learningResource/:id
 * @access Private
 */
const deleteLearningResourceOfSubtopic = asyncHandler(async (req, res) => {
    //Check if the subtopic exists or not
    const subtopic = await Subtopic.findById(req.body.subtopic)
    if(!subtopic){
        res.status(404)
        throw new Error('Subtopic not found')
    }
    //Check if the learning resource exists or not by resource id
    const resources = subtopic.resources
    let targetedResource = null
    for(let i = 0; i < resources.length; i++){
        if(resources[i]._id == req.params.id){
            targetedResource = resources[i]
        }
    }
    if(targetedResource == null){
        res.status(400)
        throw new Error('Learning resource not found')
    }
    //Check if the learning resource belongs to this user
    if(targetedResource.user != req.user.id){
        res.status(400)
        throw new Error('Not authorized to delete this resource')
    }else{
        const newArray = await resources.filter(resource => resource._id != req.params.id)

        const updatedSubtopic = await Subtopic.findByIdAndUpdate(req.body.subtopic, {resources: newArray}, {new: true})

        res.status(200).json(updatedSubtopic)
    }
})

/**
 * @author Pete To
 * @description Create a new subtopic
 * @router POST /api/subtopic
 * @access Private, admin
 */
const createSubtopic = asyncHandler(async (req, res) => {
    //Check if any field is missing
    if(!req.body.name || !req.body.description || !req.body.course){
        res.status(400)
        throw new Error('Please complete all the required fields')
    }

    //Check if the course exists or not
    const course = await Course.findById(req.body.course)
    if(!course){
        res.status(404)
        throw new Error('Course not found')
    }

    //Check if the name of the subtopic has repeated
    const repeatedSubtopic = await Subtopic.findOne({name: req.body.name})
    if(repeatedSubtopic){
        res.status(400)
        throw new Error('This subtopic has been registered')
    }

    const subtopic = await Subtopic.create({
        name: req.body.name,
        description: req.body.description,
        resources: [],
        course: req.body.course
    })

    res.status(200).json(subtopic)
})

/**
 * @author Pete To
 * @description Edit an existing subtopic
 * @router PUT /api/subtopic/:id
 * @access Private, admin
 */
const updateSubtopic = asyncHandler(async (req, res) => {
    //Check if the subtopic exists
    const subtopic = await Subtopic.findById(req.params.id)
    if(!subtopic){
        res.status(404)
        throw new Error('Subtopic not found')
    }

    const updatedSubtopic = await Subtopic.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedSubtopic)
})

/**
 * @author Pete To
 * @description Delete an existing subtopic
 * @router DELETE /api/subtopic/:id
 * @access Private, admin
 */
const deleteSubtopic = asyncHandler(async (req, res) => {
    //Check if the subtopic exists
    const subtopic = await Subtopic.findById(req.params.id)
    if(!subtopic){
        res.status(404)
        throw new Error('Subtopic not found')
    }

    await Subtopic.findByIdAndRemove(req.params.id)

    res.status(200).json(req.params.id)
})

module.exports = {
    getAllSubtopics,
    getSubtopicsByCourseId,
    getSubtopicBySubtopicId,
    createSubtopic,
    addLearningResourceToSubtopic,
    deleteLearningResourceOfSubtopic,
    updateSubtopic,
    deleteSubtopic
}