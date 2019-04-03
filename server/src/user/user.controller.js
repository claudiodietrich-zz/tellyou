const bcrypt = require('bcryptjs')
const User = require('./user.model')
const { validationHandler } = require('../utils/validation')
const { generateToken } = require('../utils/security')

exports.singup = async function (req, res, next) {
  try {
    validationHandler(req)

    const { name, email } = req.body
    const password = bcrypt.hashSync(req.body.password, 10)

    const user = await User.create({ name, email, password })

    const token = generateToken({ userId: user.id })

    res.status(200).json(token)
  } catch (error) {
    next(error)
  }
}
