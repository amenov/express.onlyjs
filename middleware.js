module.exports = () => (req, res, next) => {
  req.only = (...keys) => {
    if (Array.isArray(keys[0])) keys = keys[0]

    const data = {}

    for (const key of keys) {
      value = req.body[key]

      if (value !== undefined) data[key] = value
    }

    return Object.keys(data).length ? data : null
  }

  next()
}
