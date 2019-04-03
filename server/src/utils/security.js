const jwt = require('jsonwebtoken')

const jwtSecret = 'topSecret' || process.env.JWT_SECRET

exports.generateToken = data => {
  return jwt.sign(data, jwtSecret)
}
