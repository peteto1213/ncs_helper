const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config() //Allow access to the environmental variable in ".env"
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const port = process.env.PORT || 5000
//connect to the database when server.js is running
connectDB()

const app = express()

//Get the body of the request in json format - for error middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))  

//route of different collections
app.use('/api/course', require('./routes/courseRoutes'))
app.use('/api/blogCategory', require('./routes/blogCategoryRoutes'))
app.use('/api/blog', require('./routes/blogRoutes'))
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/subtopic', require('./routes/subtopicRoutes'))
app.use('/api/guide', require('./routes/guideRoutes'))

//error handling that override the default errorHandler in Express
app.use(errorHandler)

app.listen(port, () => console.log(`Server running at port ${port}`))
