const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../../../config/auth');
const { ValidationError } = require('../../../shared/utils/errors');

const authController = {
  async register(req, res, next) {
    try {
      const { username, email, password, role } = req.body;

      const userExists = await User.findOne({ 
        where: { 
          [Op.or]: [{ username }, { email }] 
        } 
      });

      if (userExists) {
        throw new ValidationError('Username or email already exists');
      }

      const user = await User.create({
        username,
        email,
        password,
        role
      });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        config.jwtSecret,
        { expiresIn: config.jwtExpiresIn }
      );

      res.status(201).json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user || !user.isActive) {
        throw new ValidationError('Invalid credentials');
      }

      const isValidPassword = await user.validatePassword(password);
      if (!isValidPassword) {
        throw new ValidationError('Invalid credentials');
      }

      await user.update({ lastLogin: new Date() });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        config.jwtSecret,
        { expiresIn: config.jwtExpiresIn }
      );

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      next(error);
    }
  },

  async getProfile(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: ['id', 'username', 'email', 'role', 'lastLogin']
      });
      
      if (!user) {
        throw new ValidationError('User not found');
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = authController;