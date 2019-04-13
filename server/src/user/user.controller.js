const bcrypt = require('bcryptjs')
const User = require('./user.model')
const { validationHandler } = require('../utils/validation')
const { generateToken } = require('../utils/security')

exports.create = async function (req, res, next) {
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

exports.authenticate = async function (req, res, next) {
  try {
    validationHandler(req)

    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) throw new Error('incorrect email or password')

    const passwordMatch = bcrypt.compareSync(password, user.password)
    if (!passwordMatch) throw new Error('incorrect email or password')

    const token = generateToken({ userId: user.id })

    res.status(200).json(token)
  } catch (error) {
    next(error)
  }
}
