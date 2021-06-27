const TaskModel = require('../../models/tasks')
const { BadRequestError } = require('../../error/error')

const deleteTask = async (req, res, next) => {
  try {
    if (!req.params.id)
      throw new BadRequestError('Task ID is required')
    const query = { _id: req.params.id }
    const response = await TaskModel.findOneAndDelete(query).lean()
    res.json(response)
  } catch(e) {
    console.log(`Delete task Error: ${e}`)
    next(e)
  }
}

module.exports = { deleteTask }