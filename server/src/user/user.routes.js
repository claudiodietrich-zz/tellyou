const router = require('express').Router()
const userController = require('./user.controller')
const userValidation = require('./user.validation')

router.post('/', userValidation.validate('create'), userController.create)
router.post('/authenticate', userValidation.validate('authenticate'), userController.authenticate)

module.exports = router
