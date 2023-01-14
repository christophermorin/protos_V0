const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const app = express()

const middleware = require('./utils/middleware')
const protosRouter = require('./controllers/protosController')
const activeProtosRouter = require('./controllers/activeProtosController')
const userRouter = require('./controllers/userController')
const loginRouter = require('./controllers/loginController')

// ---------------------- IMPORTS END --------------------------------------
const mongoUrl = config.DB_URI
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(res => {
    logger.info('Connected to DB')
  })
  .catch(error => logger.error(error))

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.static('build'))
app.use(express.json())


// Routes

app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/protos', protosRouter)
app.use('/api/activeProtos', activeProtosRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app