const validator = require('validator')
const mongoose = require('mongoose')
const { body, param } = require('express-validator/check')
const { validationMessages } = require('../utils/validation')
const User = require('../user/user.model')
const { Archetype } = require('../archetype/archetype.model')
const { Stage } = require('../stage/stage.model')
const storyEnums = require('./story.enum')

exports.validate = method => {
  switch (method) {
    case 'create' : {
      return createValidation()
    }

    case 'findAllByUser': {
      return findAllByUserValidation()
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
      .custom(archetypesHasAllRequiredAarchetype).withMessage('must include all required archetypes'),
    body('stages')
      .exists().withMessage(validationMessages.exists)
      .isArray().withMessage(validationMessages.isArray)
      .custom(arrayCantBeEmpty).withMessage(validationMessages.isEmpty)
      .custom(stages => arraryObjectCotainsProperty(stages, '_id')).withMessage('stage must contain a id')
      .custom(stages => arraryObjectCotainsProperty(stages, 'number')).withMessage('stage must contain a number')
      .custom(stages => arraryObjectCotainsProperty(stages, 'name')).withMessage('stage must contain a name')
      .custom(stages => arraryObjectCotainsProperty(stages, 'description')).withMessage('stage must contain a description')
      .custom(stages => arraryObjectCotainsProperty(stages, 'context')).withMessage('stage must contain a context')
      .custom(stages => arraryObjectCotainsProperty(stages, 'keyPhrases')).withMessage('stage must contain key phrases')
      .custom(stages => arraryObjectCotainsProperty(stages, 'required')).withMessage('stage must contain a required field')
      .custom(stages => arraryObjectPropertyIsObjectId(stages, '_id')).withMessage(`stage _id must be a valid Object ID`)
      .custom(stages => arraryObjectPropertyIsTypeof(stages, 'number', 'number')).withMessage('stage number must be a number')
      .custom(stages => arraryObjectPropertyIsTypeof(stages, 'name', 'string')).withMessage('stage name must be a string')
      .custom(stages => arraryObjectPropertyIsTypeof(stages, 'description', 'string')).withMessage('stage description must be a string')
      .custom(stages => arraryObjectPropertyIsArray(stages, 'context')).withMessage('stage context must be a array')
      .custom(stages => arraryObjectPropertyIsArray(stages, 'keyPhrases')).withMessage('stage keyPhrases must be a array')
      .custom(stages => arraryObjectPropertyIsTypeof(stages, 'required', 'boolean')).withMessage('stage required must be a boolean')
      .custom(stageIsRegistered).withMessage('stage must be registered')
      .custom(stagesHasAllRequiredStages).withMessage('must include all required stages')
  ]
}

const findAllByUserValidation = () => {
  return [
    param('userId')
      .exists().withMessage(validationMessages.exists)
      .isString().withMessage(validationMessages.isString)
      .custom(isObjectId).withMessage(validationMessages.isObjetcId)
      .trim()
  ]
}

const isObjectId = id => {
  return mongoose.Types.ObjectId.isValid(id)
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

const arraryObjectPropertyIsArray = (array, property) => {
  let allPropertiesAreArray = true

  array.forEach(item => {
    const isArray = Array.isArray(item[property])
    if (!isArray) {
      allPropertiesAreArray = false
    }
  })

  return allPropertiesAreArray
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

const stageIsRegistered = async stages => {
  let allStagesAreRegistered = true

  for (const stage of stages) {
    const stageIsRegistered = await Stage.findById(stage._id)
    if (stageIsRegistered === null) {
      allStagesAreRegistered = false
    }
  }

  return allStagesAreRegistered
}

const stagesHasAllRequiredStages = async stages => {
  let stagesHasAllRequiredAarchetype = true

  const requiredStages = await Stage.find({ required: true })

  const stagesIds = stages.map(stage => {
    return stage._id
  })

  if (requiredStages !== null) {
    requiredStages.forEach(requiredStage => {
      if (!stagesIds.includes(requiredStage.id)) {
        stagesHasAllRequiredAarchetype = false
      }
    })
  }

  return stagesHasAllRequiredAarchetype
}
