const logger = require('../../config/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err);

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message
      }
    });
  }

  res.status(500).json({
    error: {
      message: 'Internal Server Error'
    }
  });
};

module.exports = errorHandler;