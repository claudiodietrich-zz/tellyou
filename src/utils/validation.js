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
  isArray: 'must be a array',
  isString: 'must be a string',
  isEmail: 'must be a valid e-mail address',
  isEmpty: 'can\'t be empty',
  isLength: 'incorrect length',
  isNumeric: 'must be a numeric',
  isObjetcId: 'must be an valid ObjetcId'
}
