const only = require('amenov.only')

module.exports = () => (req, res, next) => {
  req.only = (...keys) => only(req.body, ...keys)

  next()
}
