const UserModel = require('../../models/users')
const pagination = require('../../helpers/pagination')

const getAllUsers = async (req, res, next) => {
  const { limit, page } = req.query
  const paginationParam = pagination(limit, page)
  try {
    const users = await UserModel.find()
    .populate('tasks')
    .sort({ updatedAt: -1 })
    .limit(paginationParam.limit)
    .skip(paginationParam.skip)
    .lean()
    res.json({
      body: users,
      pagination: {
        count: users.length,
        limit: paginationParam.limit,
        page: parseInt(page),
        next: parseInt(page) + 1
      }
    })
  } catch(e) {
    console.log(`Get all users Error: ${e}`)
    next(e)
  }
}

module.exports = { getAllUsers }