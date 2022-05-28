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
    nickname: String,
    icon: String,
    activationStatus: Boolean,
    userType: String
},
{
    timestamps: true
}
)

module.exports = mongoose.model('User', userSchema)
