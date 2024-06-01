//routes/leaveRoutes


const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const leaveController = require('../controllers/leaveController');

// Apply for leave
router.post('/apply', authMiddleware.authenticate, leaveController.applyLeave);

// View leave status
router.get('/status', authMiddleware.authenticate, leaveController.leaveStatus);

module.exports = router;









