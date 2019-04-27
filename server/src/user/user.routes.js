const router = require('express').Router()
const userController = require('./user.controller')
const userValidation = require('./user.validation')

router.post('/', userValidation.validate('create'), userController.create)
router.post('/authenticate', userValidation.validate('authenticate'), userController.authenticate)
router.get('/email/:email', userValidation.validate('findByEmail'), userController.findByEmail)

module.exports = router
