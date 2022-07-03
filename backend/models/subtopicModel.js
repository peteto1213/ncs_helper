const mongoose = require('mongoose')

const subtopicSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true,
        sparse: true
    },
    resources: {
        sparse: true,
        type:[
            {
                title: {
                    type: String,
                    sparse: true
                },
                link: {
                    type: String,
                    sparse: true
                },
                type: {
                    type: String,
                    sparse: true
                },
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    sparse: true
                }
            },
        ],
    },
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