const router = require('express').Router()
const stageController = require('./stage.controller')

router.get('/', stageController.findAll)

module.exports = router
