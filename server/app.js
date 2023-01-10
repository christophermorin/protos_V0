const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
// Routers
const protosRouter = require('./controllers/protosController')
const activeProtosRouter = require('./controllers/activeProtosController')

const mongoUrl = config.DB_URI
mongoose.connect(mongoUrl)
  .then(res => {
    logger.info('Connected to DB')
  })
  .catch(error => logger.error(error))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/protos', protosRouter)
app.use('/api/activeProtos', activeProtosRouter)

module.exports = app