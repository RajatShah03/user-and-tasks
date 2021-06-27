const UserModel = require('../../models/users')
const { BadRequestError } = require('../../error/error')

const getUser = async (req, res, next) => {
  try {
    if (!req.params.id)
      throw new BadRequestError('User ID is required')
    const query = { _id: req.params.id }
    const user = await UserModel.findOne(query)
      .populate('tasks')
      .lean()
    res.json(user)
  } catch(e) {
    console.log(`Get user Error: ${e}`)
    next(e)
  }
}

module.exports = { getUser }