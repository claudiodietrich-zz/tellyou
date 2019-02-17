const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(cors())

app.use((error, req, res, next) => {
  const status = error.statusCode || 500
  res.status(status).json(error.message)
})

app.listen(3000)
