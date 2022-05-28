const mongoose = require('mongoose')

const blogCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name to the blog category']
    },
    description: String,
    bgColor:{
        type: String,
        required: [true, 'Please add a background color to the blog category']
    }
})

module.exports = mongoose.model('BlogCategory', blogCategorySchema)