const TaskModel = require('../../models/tasks')

const getAllTasks = async (req, res, next) => {
  try {
    const task = await TaskModel.find().lean()
    res.json(task)
  } catch(e) {
    console.log(`Get all task Error: ${e}`)
    next(e)
  }
}

module.exports = { getAllTasks }