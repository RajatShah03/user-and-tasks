class GenericError extends Error {
  constructor(message) {
    super()
    this.message = message || 'Internal Server Error'
  }

  getStatus() {
    if (this instanceof BadRequestError)
      return 400
    if (this instanceof NotFoundError)
      return 404
    if (this instanceof UnauthorizedError)
      return 401
    if (this instanceof ForbiddenError)
      return 403
    return 500
  }
}

class BadRequestError extends GenericError {

}

class NotFoundError extends GenericError {
  
}

class UnauthorizedError extends GenericError {
  
}

class ForbiddenError extends GenericError {
  
}

module.exports = {
  GenericError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
}