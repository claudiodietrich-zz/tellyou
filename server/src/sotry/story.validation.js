const validator = require('validator')
const mongoose = require('mongoose')
const { body } = require('express-validator/check')
const { validationMessages } = require('../utils/validation')
const User = require('../user/user.model')
const { Archetype } = require('../archetype/archetype.model')
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
      .custom(arrayCantBeEmpty).withMessage(validationMessages.isEmpty)
      .custom(arrayItemIsObject).withMessage('author must be an object')
      .custom(authors => arraryObjectCotainsProperty(authors, 'user')).withMessage('author must contain a user id')
      .custom(authors => arraryObjectPropertyIsObjectId(authors, 'user')).withMessage(`user must be a valid Object ID`)
      .custom(userIsRegistered).withMessage('user must be registered')
      .custom(authors => arraryObjectCotainsProperty(authors, 'role')).withMessage(`author must contain a role`)
      .custom(authors => arraryObjectPropertyIsTypeof(authors, 'role', 'number')).withMessage('author role must be a number')
      .custom(roleIsValid).withMessage('author role must be a valid role'),
    body('archetypes')
      .exists().withMessage(validationMessages.exists)
      .isArray().withMessage(validationMessages.isArray)
      .custom(arrayCantBeEmpty).withMessage(validationMessages.isEmpty)
      .custom(arrayItemIsObject).withMessage('archetype must be an object')
      .custom(archetypes => arraryObjectCotainsProperty(archetypes, '_id')).withMessage('archetype must contain a id')
      .custom(archetypes => arraryObjectCotainsProperty(archetypes, 'name')).withMessage('archetype must contain a name')
      .custom(archetypes => arraryObjectCotainsProperty(archetypes, 'description')).withMessage('archetype must contain a description')
      .custom(archetypes => arraryObjectCotainsProperty(archetypes, 'character')).withMessage('archetype must contain a character')
      .custom(archetypes => arraryObjectCotainsProperty(archetypes, 'required')).withMessage('archetype must contain a required field')
      .custom(archetypes => arraryObjectPropertyIsObjectId(archetypes, '_id')).withMessage(`archetype _id must be a valid Object ID`)
      .custom(archetypes => arraryObjectPropertyIsTypeof(archetypes, 'name', 'string')).withMessage('archetype name must be a string')
      .custom(archetypes => arraryObjectPropertyIsTypeof(archetypes, 'description', 'string')).withMessage('archetype description must be a string')
      .custom(archetypes => arraryObjectPropertyIsTypeof(archetypes, 'character', 'string')).withMessage('archetype character must be a string')
      .custom(archetypes => arraryObjectPropertyIsTypeof(archetypes, 'required', 'boolean')).withMessage('archetype required field must be a boolean')
      .custom(archetypeIsRegistered).withMessage('archetype must be registered')
      .custom(archetypesHasAllRequiredAarchetype).withMessage('must include all required archetypes')
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

const arrayCantBeEmpty = array => {
  return array.length !== 0
}

const arrayItemIsObject = array => {
  let allItensAreObjects = true

  array.forEach(item => {
    const isObject = typeof item === 'object'
    if (!isObject) {
      allItensAreObjects = false
    }
  })

  return allItensAreObjects
}

const arraryObjectCotainsProperty = (array, property) => {
  let allItensContainsValue = true

  array.forEach(item => {
    const containValue = property in item
    if (!containValue) {
      allItensContainsValue = false
    }
  })

  return allItensContainsValue
}

const arraryObjectPropertyIsObjectId = (array, property) => {
  let allPropertiesAreObjectsId = true

  array.forEach(item => {
    const isObjectId = mongoose.Types.ObjectId.isValid(item[property])
    if (!isObjectId) {
      allPropertiesAreObjectsId = false
    }
  })

  return allPropertiesAreObjectsId
}

const arraryObjectPropertyIsTypeof = (array, property, type) => {
  let allPropertiesAreTypeof = true

  array.forEach(item => {
    const isTypeof = typeof item[property] === type
    if (!isTypeof) {
      allPropertiesAreTypeof = false
    }
  })

  return allPropertiesAreTypeof
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

const archetypeIsRegistered = async archetypes => {
  let allArchetypesAreRegistered = true

  for (const archetype of archetypes) {
    const archetypeIsRegistered = await Archetype.findById(archetype._id)
    if (archetypeIsRegistered === null) {
      allArchetypesAreRegistered = false
    }
  }

  return allArchetypesAreRegistered
}

const archetypesHasAllRequiredAarchetype = async archetypes => {
  let archetypesHasAllRequiredAarchetype = true

  const requiredArchetypes = await Archetype.find({ required: true })

  const archetypesIds = archetypes.map(archetype => {
    return archetype._id
  })

  if (requiredArchetypes !== null) {
    requiredArchetypes.forEach(requiredArchetype => {
      if (!archetypesIds.includes(requiredArchetype.id)) {
        archetypesHasAllRequiredAarchetype = false
      }
    })
  }

  return archetypesHasAllRequiredAarchetype
}
