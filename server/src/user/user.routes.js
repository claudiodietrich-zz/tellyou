const router = require('express').Router()
const userController = require('./user.controller')

router.post('/singup', userController.singup)

module.exports = router
