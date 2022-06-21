const mongoose = require('mongoose')

const subtopicSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    resources: [
        {
            title: {
                type: String,
                unique: true,
                required: true
            },
            link: {
                type: String,
                unique: true,
                required: true
            },
            type: {
                type: String,
                unique: true,
                required: true
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            }
        }
    ],
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Course'
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Subtopic', subtopicSchema)