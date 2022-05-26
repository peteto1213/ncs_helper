const express = require('express')
const router = express.Router() 
const {getStudyPlans, createStudyPlan, updateStudyPlan, deleteStudyPlan} = require('../controllers/studyPlanController')

router.get('/', getStudyPlans)

router.post('/', createStudyPlan)

router.put('/:id', updateStudyPlan) 

router.delete('/:id', deleteStudyPlan)

module.exports = router
