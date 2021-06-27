const UserModel = require('../../models/users')
const { BadRequestError } = require('../../error/error')

const deleteUser = async (req, res, next) => {
  try {
    if (!req.params.id)
      throw new BadRequestError('User ID is required')
    const query = { _id: req.params.id }
    const response = await UserModel.findOneAndDelete(query).lean()
    res.json(response)
  } catch(e) {
    console.log(`Delete user Error: ${e}`)
    next(e)
  }
}

module.exports = { deleteUser }