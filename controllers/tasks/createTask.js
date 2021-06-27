const TaskModel = require('../../models/tasks')
const { BadRequestError } = require('../../error/error')

const createTask = async (req, res, next) => {
  try {
    if (!req.body.title)
      throw new BadRequestError('Task title is required')
    const newTask = new TaskModel({
      ...req.body
    })
    const task = await newTask.save()
    res.json(task)
  } catch(e) {
    console.log(`Post task Error: ${e}`)
    next(e)
  }
}

module.exports = { createTask }