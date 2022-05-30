const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
    nickname:{
        type: String,
        required: true
    },
    icon: String,
    activationStatus: Boolean,
    userType:{
        type: String,
        required: true
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model('User', userSchema)

