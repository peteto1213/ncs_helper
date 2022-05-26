/**
 * @author Pete To
 * @description Get study plans
 * @router GET /api/studyPlan
 * @access Private
 */
const getStudyPlans = (req, res) => {
    res.status(200).json({message: "Hello"})
}

/**
 * @author Pete To
 * @description Create a new study plan
 * @router POST /api/studyPlan
 * @access Private
 */
const createStudyPlan = (req, res) => {
    if(!req.body.text){
        res.status(400).json({message: "please add a text field"})
    }
    res.status(201).json({message: "plan created"})
}

/**
 * @author Pete To
 * @description Edit a study plan
 * @router PUT /api/studyPlan/:id
 * @access Private
 */
const updateStudyPlan = (req, res) => {
    res.status(200).json({message: `planId: ${req.params.id} successfully updated`})
}

/**
 * @author Pete To
 * @description Delete a study plan
 * @router DELETE /api/studyPlan/:id
 * @access Private
 */
const deleteStudyPlan = (req, res) => {
    res.status(200).json({message: `planId: ${req.params.id} successfully deleted`})
}

module.exports = {
    getStudyPlans,
    createStudyPlan,
    updateStudyPlan,
    deleteStudyPlan
}