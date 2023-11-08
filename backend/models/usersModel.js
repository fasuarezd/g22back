const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor tecla tu nombre']
    },
    email: {
        type: String,
        required: [true, 'Por favor tecla tu email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Por favor tecla tu password']
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)