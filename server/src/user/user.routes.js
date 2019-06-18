const router = require('express').Router()
const userController = require('./user.controller')
const userValidation = require('./user.validation')

router.post('/', userValidation.validate('create'), userController.create)
router.post('/authenticate', userValidation.validate('authenticate'), userController.authenticate)
router.get('/', userController.findAll)
router.get('/email/:email', userValidation.validate('findByEmail'), userController.findByEmail)
router.get('/name/:name', userValidation.validate('findByName'), userController.findByName)

module.exports = router
