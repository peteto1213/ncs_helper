const mongoose = require ('mongoose')

const guideSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    guideQuestions: [
        {
            question: {
                type: String,
                required: true
            },
            answer: {
                type: String,
                required: true
            }
        }
    ],
    likeCount: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            content: {
                type: String,
                required: true
            },
            createdAt: {
                type: String
            }
        }
    ],
    subtopic: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Subtopic'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Guide', guideSchema)