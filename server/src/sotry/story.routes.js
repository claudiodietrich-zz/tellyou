const router = require('express').Router()
const storyController = require('./story.controller')
const sotryValidation = require('./story.validation')

router.post('/', sotryValidation.validate('create'), storyController.create)
// todo: add validation
router.post('/:storyId/stages/:stageId/events', storyController.creteEvent)

router.get('/', storyController.findAll)
router.get('/:storyId', sotryValidation.validate('findById'), storyController.findById)
router.get('/user/:userId', sotryValidation.validate('findAllByUser'), storyController.findAllByUser)

module.exports = router
