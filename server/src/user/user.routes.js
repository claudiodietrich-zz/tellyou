const router = require('express').Router()
const userController = require('./user.controller')
const userValidation = require('./user.validation')

router.post('/singup', userValidation.validate('singup'), userController.singup)

module.exports = router
