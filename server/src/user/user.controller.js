const User = require('./user.model')
const { validationHandler } = require('../utils/validation')
const bcrypt = require('bcryptjs')

exports.singup = async function (req, res, next) {
  try {
    validationHandler(req)

    const { name, email } = req.body
    const password = bcrypt.hashSync(req.body.password, 10)

    const user = await User.create({ name, email, password })

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}
