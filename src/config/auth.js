
module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    jwtExpiresIn: '24h',
    saltRounds: 10,
    refreshTokenExpiresIn: '7d'
  };