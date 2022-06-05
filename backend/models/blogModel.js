const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    //Act as a foriegn key from User collection in MongoDB
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    likeCount:{
        type: Number,
        required: true
    },
    blogCategory: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'BlogCategory'
    }
},
{
    //timestamps will include createdAt and updatedAt time for the blog
    timestamps: true,
}
)

module.exports = mongoose.model('Blog', blogSchema)