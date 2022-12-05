const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Unauthorized: Token required' });
  }

  const token = authorization.split(' ')[1]; // authorization: Bearer <token>

  try {
    // use secret to verify token
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ _id }); 
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({ error: 'Request is not authorized' });
  }
}

module.exports = requireAuth;