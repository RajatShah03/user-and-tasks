const config = require('../config')

module.exports = (limit, page) => {
  return {
    limit: parseInt(limit) || config.defaultLimitPerPage,
    skip: (parseInt(page) || config.initPage) * (limit || config.defaultLimitPerPage)
  }
}