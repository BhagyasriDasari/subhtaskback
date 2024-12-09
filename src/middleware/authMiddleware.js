const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Access denied');
  try {
    req.user = jwt.verify(token, 'secret');
    next();
  } catch {
    res.status(403).send('Invalid token');
  }
};

module.exports = { authenticate };
