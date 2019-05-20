const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const cors = require('cors')

const { bootstrap } = require('./bootstrap')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(expressValidator())
app.use(cors())

app.use('/api/users', require('./user/user.routes'))
app.use('/api/stories', require('./sotry/story.routes'))
app.use('/api/archetypes', require('./archetype/archetype.routes'))

app.use((error, req, res, next) => {
  const status = error.statusCode || 500
  res.status(status).json(error.message)
})

async function startServer () {
  try {
    await mongoose.connect('mongodb://localhost:27017/tellyou', { useNewUrlParser: true })
    app.listen(3000)
    bootstrap()
  } catch (error) {
    console.log(error.message)
  }
}

startServer()
