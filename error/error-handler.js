const { GenericError } = require('./error')

const errorHandler = (err, req, res, next) => {
  if (err instanceof GenericError) {
    return res.status(err.getStatus())
      .json({
        status: 'error',
        message: err.message
      })
  }
}

module.exports = errorHandler