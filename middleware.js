const flat = require('flat')

module.exports = () => (req, res, next) => {
  req.only = (...keys) => {
    if (Array.isArray(keys[0])) keys = keys[0]

    const flatBody = flat.flatten(req.body)
    const flatKeys = []

    function flattenKeys(keys, prevKey = '') {
      for (const key of keys) {
        if (typeof key === 'string') {
          flatKeys.push(prevKey ? `${prevKey}.${key}` : key)
        } else {
          for (const [_key, _keys] of Object.entries(key)) {
            flattenKeys(_keys, prevKey ? `${prevKey}.${_key}` : _key)
          }
        }
      }
    }

    flattenKeys(keys)

    const siftedFlatBody = {}

    for (const flatKey of flatKeys) {
      const value = flatBody[flatKey]

      if (value !== undefined) {
        siftedFlatBody[flatKey] = value
      }
    }

    const siftedBody = flat.unflatten(siftedFlatBody)

    return Object.keys(siftedBody).length ? siftedBody : null
  }

  next()
}
