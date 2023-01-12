const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const passport = require('passport')
const passportLocal = require('passport-local').Strategy
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const session = require('express-session')
// const bodyParser = require('body-parser') Not needed because of express.json()?
const config = require('./utils/config')
const logger = require('./utils/logger')
const app = express()
const protosRouter = require('./controllers/protosController')
const activeProtosRouter = require('./controllers/activeProtosController')
const usersRouter = require('./controllers/usersController')

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
app.use(express.json())
app.use(express.static('build'))
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: config.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser(config.SECRET));
app.use(passport.initialize());
app.use(passport.session());
require("./utils/passportConfig")(passport);

// Routes
app.use('/api/', usersRouter)
app.use('/api/protos', protosRouter)
app.use('/api/activeProtos', activeProtosRouter)

module.exports = app