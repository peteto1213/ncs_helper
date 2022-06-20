const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    courseCode: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Course', courseSchema)