const jwt = require('jsonwebtoken')
const { ForbiddenError, UnauthorizedError } = require('../error/error')

const authenticate = (req, res, next) => {
  try {
    const { headers: { authorization } } = req
    console.log(authorization)
    if (authorization) {
      const accessToken = authorization.split(' ')[1]

      jwt.verify(
        accessToken,
        process.env.JWT_SECRET,
        (err, user) => {
          if (err)
            throw new ForbiddenError('Forbidden')
          req.user = user
          next()
        }
      )
    } else {
      throw new UnauthorizedError('User is unauthorized')
    }
  } catch(e) {
    console.log(`Authentication Error: ${e}`)
    next(e)
  }
}

module.exports = authenticate