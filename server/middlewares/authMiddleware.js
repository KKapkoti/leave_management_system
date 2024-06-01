//middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
// const jwtConfig = require('../config/jwt');
const User = require('../models/UserModel');


const authenticate = async (req, res, next) => {
  try {
    // Extract token from request headers
    const token = req.headers.authorization;

    // if (!token) {
      if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token is required' });
    }

    // Verify token
    const tokenValue = token.split(' ')[1];
    const decodedToken = jwt.verify(tokenValue, process.env.JWT_SECRET || 'defaultsecret');
    console.log('Decoded Token:', decodedToken);

    // Check if user exists
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      console.error('User not found for the provided token');
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Attach user object to request for further processing
    req.user = user;

    next(); // Call next middleware
  } catch (error) {
    console.error('Error occurred during token verification:', error.message);
    // console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

const authorizeHOD = (req, res, next) => {
  // Check if user is HOD
  if (req.user && req.user.role === 'HOD') {
      next(); // HOD is authorized, proceed to the next middleware
  } else {
      res.status(403).json({ message: 'Access forbidden' }); // User is not authorized
  }
};




const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ message: 'Access forbidden' });
  }
};

module.exports = { authenticate, authorizeHOD, authorizeAdmin };











