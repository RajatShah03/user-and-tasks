const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  tasks: [{
    type: String,
    ref: 'Tasks'
  }]
}, { timestamps: true })

const UserModel = mongoose.model('Users', userSchema, 'users')

module.exports = UserModel