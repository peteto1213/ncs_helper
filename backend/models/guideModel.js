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
                required: true,
                sparse: true
            },
            answer: {
                type: String,
                required: true,
                sparse: true
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
                ref: 'User',
                sparse: true
            },
            content: {
                type: String,
                required: true,
                sparse: true
            },
            createdAt: {
                type: String,
                sparse: true
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