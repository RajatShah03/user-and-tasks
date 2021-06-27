const UserModel = require('../../models/users')

const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find()
    .populate('tasks')
    .lean()
    res.json(users)
  } catch(e) {
    console.log(`Get all users Error: ${e}`)
    next(e)
  }
}

module.exports = { getAllUsers }