const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar_url: {
        type: String,
        required: true
    }
})

UserSchema.methods.comparePassword = function (password) {
    const user = this
    return bcrypt.compareSync(password, user.password)
}

const User = mongoose.model('User', UserSchema, 'users');

module.exports = User;