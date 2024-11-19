const jwt = require('jsonwebtoken');
const config = require('../../../config/auth');
const { AuthenticationError } = require('../../../shared/utils/errors');

const authMiddleware = {
  authenticateToken(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        throw new AuthenticationError('No token provided');
      }

      jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
          throw new AuthenticationError('Invalid token');
        }
        req.user = decoded;
        next();
      });
    } catch (error) {
      next(error);
    }
  },

  authorize(...roles) {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(new AuthenticationError('Insufficient permissions'));
      }
      next();
    };
  }
};

module.exports = authMiddleware;