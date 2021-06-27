const jwt = require('jsonwebtoken')
const UserModel = require('../models/users')
const { BadRequestError, NotFoundError } = require('../error/error')
const { hashPassword } = require('../helpers/hash')

const authorize = async (req, res, next) => {
  const { email, password } = req.body

  try {
    if (!email || !password)
      throw new BadRequestError('Invalid input: email & password required')
    const query = {
      email
    }
    const user = await UserModel.findOne(query).lean()

    if (!user)
      throw new NotFoundError('User not found or incorrect credentials')
    
    const accessToken = jwt.sign(
      {
        userId: user._id,
        email: user.email
      },
      process.env.JWT_SECRET
    )
    res.json({ accessToken })
  } catch(e) {
    console.log(`Auth Error: ${e}`)
    next(e)
  }
}

module.exports = authorize