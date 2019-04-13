const router = require('express').Router()
const storyController = require('./story.controller')
const sotryValidation = require('./story.validation')

router.post('/', sotryValidation.validate('create'), storyController.create)

module.exports = router
