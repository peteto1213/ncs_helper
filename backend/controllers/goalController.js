const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel') //Goal model created in the model folder
const User = require('../models/userModel')

/**
 * @author Pete To
 * @description Get goals
 * @route GET /api/goals
 * @access Private
 */
const getGoals = asyncHandler( async (req,res) => {
    // Get all goals from the db, specifying particular user
    const goals = await Goal.find({ user: req.user.id })

    res.status(200).json(goals)
})

/**
 * @author Pete To
 * @description Set goals
 * @route POST /api/goals
 * @access Private
 */
const setGoal = asyncHandler( async (req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(goal)
})

/**
 * @author Pete To
 * @description Update goals
 * @route PUT /api/goals/:id
 * @access Private
 */
const updateGoal = asyncHandler( async (req,res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)
    //Check if user exist
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    //User can only update his/her goal
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {
            new: true
        }
    )

    res.status(200).json(updateGoal)
})

/**
 * @author Pete To
 * @description Delete goals
 * @route DELETE /api/goals/:id
 * @access Private
 */
const deleteGoal = asyncHandler( async (req,res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)
    //Check if user exist
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    //User can only update his/her goal
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await goal.remove()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}