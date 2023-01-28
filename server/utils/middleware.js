const logger = require('./logger');

// const requestLogger = (request, res, next) => {
//   logger.info('Method:', request.method)
//   logger.info('Path:  ', request.path)
//   logger.info('Body:  ', request.body)
//   logger.info('---')
//   next()
// }

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error);
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  } if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token',
    });
  }

  next(error);
};

module.exports = {
  // requestLogger,
  unknownEndpoint,
  errorHandler,
};
