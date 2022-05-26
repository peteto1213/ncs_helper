const express = require('express')
const dotenv = require('dotenv').config //Allow access to the environmental variable in ".env"

const port = process.env.PORT || 5000

const app = express()

//Get the body of the request
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//first route - studyPlan
app.use('/api/studyPlan', require('./routes/studyPlanRoutes'))

app.listen(port, () => console.log(`Server running at port ${port}`))
