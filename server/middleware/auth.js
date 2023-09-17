const jwt = require('jsonwebtoken');
const JWTSECRET = process.env.JWTSECRET || 'shhhDontSayAword';

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    jwt.verify(token, JWTSECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.log('Something wrong with middleware');
    res.status(500).json({ msg: 'Server error' });
  }
};
