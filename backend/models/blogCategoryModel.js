const mongoose = require('mongoose')

const blogCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name to the blog category']
    },
    description: {
        type: String,
        required: [true, 'Please add a description to the blog category']
    }
})

module.exports = mongoose.model('BlogCategory', blogCategorySchema)