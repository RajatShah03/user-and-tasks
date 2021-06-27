const mongoose = require('mongoose')

const { Schema } = mongoose

const taskSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
})

const TaskModel = mongoose.model('Tasks', taskSchema, 'tasks')

module.exports = TaskModel