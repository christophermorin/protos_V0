
const http = require('http');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./utils/config');
const logger = require('./utils/logger');

const app = express();

const middleware = require('./utils/middleware');
const protosRouter = require('./controllers/protosController');
const activeProtosRouter = require('./controllers/activeProtosController');
const userRouter = require('./controllers/userController');
const loginRouter = require('./controllers/loginController');

const server = http.createServer(app);
// ---------------------- IMPORTS END --------------------------------------
const mongoUrl = config.DB_URI;
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((res) => {
    server.listen(config.PORT, () => {
      logger.info(`Server is running on port ${config.PORT}`);
    });
    logger.info('Connected to DB');
  })
  .catch((error) => logger.error(error));

// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(express.static('dist'));
app.use(express.json());

// Routes
app.get('/active', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.get('/library', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/protos', protosRouter);
app.use('/api/activeProtos', activeProtosRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
