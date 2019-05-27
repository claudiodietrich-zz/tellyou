const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const cors = require('cors')
const path = require('path')
const history = require('connect-history-api-fallback')

const { bootstrap } = require('./bootstrap')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(expressValidator())
app.use(cors())

// serve vue as front-end
app.use(history())
app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/api/users', require('./user/user.routes'))
app.use('/api/stories', require('./sotry/story.routes'))
app.use('/api/archetypes', require('./archetype/archetype.routes'))
app.use('/api/stages', require('./stage/stage.routes'))

app.use((error, req, res, next) => {
  const status = error.statusCode || 500
  res.status(status).json(error.message)
})

async function startServer () {
  try {
    const port = process.env.PORT || 3000
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/tellyou'

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    })

    app.listen(port)
    bootstrap()
    console.log(`app running at port ${port}`)
  } catch (error) {
    console.log(error.message)
  }
}

startServer()
