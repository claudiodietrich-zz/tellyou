const User = require('./user.model')
const { body } = require('express-validator/check')
const { validationMessages } = require('../utils/validation')

exports.validate = (method) => {
  switch (method) {
    case 'create' : {
      return createValidation()
    }

    case 'authenticate': {
      return authenticateValidation()
    }
  }
}

const createValidation = () => {
  return [
    body('name')
      .exists().withMessage(validationMessages.exists)
      .isString().withMessage(validationMessages.isString)
      .trim(),
    body('email')
      .exists().withMessage(validationMessages.exists)
      .isEmail().withMessage(validationMessages.isEmail)
      .custom(email => {
        return checkIfEmailIsInUse(email)
      })
      .trim(),
    body('password')
      .exists().withMessage(validationMessages.exists)
      .isString().withMessage(validationMessages.isString)
      .isLength({ min: 6 }).withMessage(validationMessages.isLength)
  ]
}

const authenticateValidation = () => {
  return [
    body('email')
      .exists().withMessage(validationMessages.exists)
      .isEmail().withMessage(validationMessages.isEmail)
      .trim(),
    body('password')
      .exists().withMessage(validationMessages.exists)
      .isString().withMessage(validationMessages.isString)
  ]
}

const checkIfEmailIsInUse = email => {
  return User.findOne({ email }).then(user => {
    if (user) {
      return Promise.reject(new Error('is already in use'))
    }
  })
}
