//routes/authRoutes.js
const express = require('express');
const router = express.Router();
const  {validateMiddleware}  = require('../middlewares/validateMiddleware.js')
// const authController = require('../controllers/authController');
const {registerUser, loginUser, logoutUser, getUsers} = require('../controllers/authController');
const { authenticate, authorizeHOD, authorizeAdmin} = require('../middlewares/authMiddleware');
// const { generateToken } = require("../config/jwt");



// User registration route
router.post('/register', validateMiddleware, authenticate, authorizeHOD, registerUser);


router.get('/users', getUsers);

//user login routes
router.post('/login',  loginUser);

router.post('/logout', logoutUser);


router.post('/admin/logout', authenticate, authorizeAdmin, logoutUser); // Add logout route for admin

module.exports = router;






