const UserModel = require('../../models/users')
const { BadRequestError } = require('../../error/error')
const { hashPassword } = require('../../helpers/hash')

const createUser = async (req, res, next) => {
  try {
    console.log('User body: ', req.body);
    if (!req.body.email || !req.body.password)
      throw new BadRequestError('Email and password are required')

    const clone = {...req.body};

    // applying basic hash to password
    clone.password = await hashPassword(clone.password);

    const newUser = new UserModel(clone)
    const user = await newUser.save()
    res.json(user)
  } catch(e) {
    console.log(`Post user Error: ${e}`)
    next(e)
  }
}

module.exports = { createUser }