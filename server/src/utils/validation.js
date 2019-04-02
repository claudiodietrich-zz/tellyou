const { validationResult } = require('express-validator/check')

exports.validationHandler = (req) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    let error = new Error(errors.array().map(e => `${e.param} ${e.msg}`).join(', '))
    error.statusCode = 422
    throw error
  }
}

exports.validationMessages = {
  exists: 'is required',
  isString: 'must be a string',
  isEmail: 'must be a valid e-mail address',
  isLength: 'incorrect length'
}
