const router = require('express').Router()
const archetypeController = require('./archetype.controller')

router.get('/', archetypeController.findAll)

module.exports = router
