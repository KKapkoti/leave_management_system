// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');
const adminController = require('../controllers/adminController');


// Admin dashboard route
router.get('/dashboard', authenticate, authorizeAdmin, adminController.getAdminDashboard);

// Admin profile route
router.get('/profile', authenticate, authorizeAdmin, adminController.getAdminProfile);

// Add HOD route
router.post('/add-hod', authenticate, authorizeAdmin, adminController.addHod);

// View users
router.get('/users', authenticate, authorizeAdmin, adminController.getUsers);


// Approve leave request
router.put('/approve-leave/:leaveId', authenticate, authorizeAdmin, adminController.approveLeave);

// Reject leave request
router.put('/reject-leave/:leaveId', authenticate, authorizeAdmin, adminController.rejectLeave);


module.exports = router;
