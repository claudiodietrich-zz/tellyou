const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET || 'topSecret'

exports.generateToken = data => {
  return jwt.sign(data, jwtSecret)
}
