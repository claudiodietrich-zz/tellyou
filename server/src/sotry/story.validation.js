const validator = require('validator')
const mongoose = require('mongoose')
const { body } = require('express-validator/check')
const { validationMessages } = require('../utils/validation')
const User = require('../user/user.model')
const storyEnums = require('./story.enum')

exports.validate = method => {
  switch (method) {
    case 'create' : {
      return createValidation()
    }
  }
}

const createValidation = () => {
  return [
    body('title')
      .exists().withMessage(validationMessages.exists)
      .isString().withMessage(validationMessages.isString)
      .trim(),
    body('objective')
      .optional()
      .isString().withMessage(validationMessages.isString)
      .trim(),
    body('keywords')
      .optional()
      .isArray().withMessage(validationMessages.isArray)
      .custom(keywordIsString).withMessage(`keyword ${validationMessages.isString}`)
      .customSanitizer(keywords => { return keywords.map(keyword => { return validator.trim(keyword) }) }),
    body('authors')
      .exists().withMessage(validationMessages.exists)
      .isArray().withMessage(validationMessages.isArray)
      .custom(authorIsObject).withMessage('author must be an object')
      .custom(authorContainsUser).withMessage('author must contain a user id')
      .custom(userIsObjectId).withMessage(`user must be a valid Object ID`)
      .custom(userIsRegistered).withMessage('user must be registered')
      .custom(authorContainsRole).withMessage(`author must contain a role`)
      .custom(roleIsNumber).withMessage('must be a number')
      .custom(roleIsValid).withMessage('author role must be a valid role')
  ]
}

const keywordIsString = keywords => {
  let allKeywordsAreStrings = true

  keywords.forEach(keyword => {
    const isString = typeof keyword === 'string'
    if (!isString) {
      allKeywordsAreStrings = false
    }
  })

  return allKeywordsAreStrings
}

const authorIsObject = authors => {
  let allAuthorsAreObjects = true

  authors.forEach(author => {
    const isObject = typeof author === 'object'
    if (!isObject) {
      allAuthorsAreObjects = false
    }
  })

  return allAuthorsAreObjects
}

const authorContainsUser = authors => {
  let allAuthorsContainsUser = true

  authors.forEach(author => {
    const containUser = 'user' in author
    if (!containUser) {
      allAuthorsContainsUser = false
    }
  })

  return allAuthorsContainsUser
}

const userIsObjectId = authors => {
  let allUsersAreObjectsId = true

  authors.forEach(author => {
    const isObjectId = mongoose.Types.ObjectId.isValid(author.user)
    if (!isObjectId) {
      allUsersAreObjectsId = false
    }
  })

  return allUsersAreObjectsId
}

const authorContainsRole = authors => {
  let allAuthorsContainsRole = true

  authors.forEach(author => {
    const containRole = 'role' in author
    if (!containRole) {
      allAuthorsContainsRole = false
    }
  })

  return allAuthorsContainsRole
}

const userIsRegistered = async authors => {
  let allUsersAreRegistered = true

  for (const author of authors) {
    const user = await User.findById(author.user)
    if (user === null) {
      allUsersAreRegistered = false
    }
  }

  return allUsersAreRegistered
}

const roleIsNumber = authors => {
  let allRolesAreNumbers = true

  authors.forEach(author => {
    const isNumber = typeof author.role === 'number'
    if (!isNumber) {
      allRolesAreNumbers = false
    }
  })

  return allRolesAreNumbers
}

const roleIsValid = authors => {
  let allRolesAreValid = true

  authors.forEach(author => {
    const isValid = storyEnums.ALL_AUTORS_ROLES.includes(author.role)
    if (!isValid) {
      allRolesAreValid = false
    }
  })

  return allRolesAreValid
}
