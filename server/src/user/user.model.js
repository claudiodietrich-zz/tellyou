const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: {
      validator: validator.isEmail
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
