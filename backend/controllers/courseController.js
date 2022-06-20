const asyncHandler = require('express-async-handler')
const Course = require('../models/courseModel')

/**
 * @author Pete To
 * @description Get all courses
 * @router GET /api/course
 * @access Public
 */
const getAllCourses = asyncHandler(async (req, res) => {
    const allCourses = await Course.find()

    return res.status(200).json(allCourses)
})

/**
 * @author Pete To
 * @description Create a new course
 * @router POST /api/course
 * @access Private, admin
 */
const createCourse = asyncHandler(async (req, res) => {
    //Check if the course code duplicates
    const repeatedCourse = await Course.findOne({courseCode: req.body.courseCode})
    if(repeatedCourse){
        res.status(400)
        throw new Error('The course code has been registered')
    }

    //Check if any empty field exists
    if(!req.body.courseCode || !req.body.name || !req.body.description){
        res.status(400)
        throw new Error('Please complete all the required fields')
    }

    const course = await Course.create({
        courseCode: req.body.courseCode,
        name: req.body.name,
        description: req.body.description
    })

    res.status(200).json(course)
})

/**
 * @author Pete To
 * @description Update an existing course
 * @router PUT /api/course/:id
 * @access Private, admin
 */
const updateCourse = asyncHandler(async (req, res) => {
    //Check if the targeted course exist
    const course = await Course.findById(req.params.id)
    if(!course){
        res.status(404)
        throw new Error('Course not found')
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(201).json(updatedCourse)
})

module.exports = {
    getAllCourses,
    createCourse,
    updateCourse
}