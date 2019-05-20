const bcrypt = require('bcryptjs')
const User = require('./user.model')
const { body, param } = require('express-validator/check')
const { validationMessages } = require('../utils/validation')

exports.validate = (method) => {
  switch (method) {
    case 'create' : {
      return createValidation()
    }

    case 'authenticate': {
      return authenticateValidation()
    }

    case 'findByEmail': {
      return findByEmailValidation()
    }

    case 'findByName': {
      return findByNameValidation()
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
      .custom(emailIsInUse).withMessage('is already in use')
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
      .custom(userIsRegistered).withMessage('not registered')
      .trim(),
    body('password')
      .exists().withMessage(validationMessages.exists)
      .isString().withMessage(validationMessages.isString)
      .custom(passwordsMatch).withMessage('is incorrect')
      .trim()
  ]
}

const findByEmailValidation = () => {
  return [
    param('email')
      .exists().withMessage(validationMessages.exists)
      .isEmail().withMessage(validationMessages.isEmail)
      .trim()
  ]
}

const findByNameValidation = () => {
  return [
    param('name')
      .exists().withMessage(validationMessages.exists)
      .trim()
  ]
}

const emailIsInUse = async email => {
  const user = await User.findOne({ email })

  if (user) {
    return false
  }
  return true
}

const userIsRegistered = async email => {
  const user = await User.findOne({ email })

  if (!user) {
    return false
  }
  return true
}

const passwordsMatch = async (password, { req }) => {
  const user = await User.findOne({ email: req.body.email })

  return bcrypt.compareSync(password, user.password)
}
