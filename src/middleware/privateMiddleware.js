const jwt = require('jsonwebtoken');
const Config = require('../config');

const privateMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] ?? '';
    const isLoggedIn = jwt.verify(token, Config.JWT_SECRET);

    return next();
  } catch (e) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
};

module.exports = privateMiddleware;
