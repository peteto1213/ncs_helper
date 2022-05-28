const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: String,
    content: String,
    user: String,
    likeCount: Number,
    blogCategory: String
},
{
    //timestamps will include createdAt and updatedAt time for the blog
    timestamps: true,
}
)

module.exports = mongoose.model('Blog', blogSchema)