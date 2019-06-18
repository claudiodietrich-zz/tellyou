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

    res.status(200).json({ token, user })
  } catch (error) {
    next(error)
  }
}

exports.authenticate = async function (req, res, next) {
  try {
    validationHandler(req)

    const { email } = req.body

    const user = await User.findOne({ email })

    const token = generateToken({ userId: user.id })

    res.status(200).json({ token, user })
  } catch (error) {
    next(error)
  }
}

exports.findAll = async function (req, res, next) {
  try {
    const users = await User.find({})

    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

exports.findByEmail = async function (req, res, next) {
  try {
    validationHandler(req)
    const email = req.params.email

    const user = await User.findOne({ email })

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

exports.findByName = async function (req, res, next) {
  try {
    validationHandler(req)
    const name = req.params.name

    const users = await User.find({ 'name': { '$regex': name, '$options': 'i' } })

    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}
