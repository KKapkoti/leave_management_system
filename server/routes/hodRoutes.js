//routes/hodRoutes
const express = require('express');
const router = express.Router();
// const authMiddleware = require('../middlewares/authMiddleware');
const { authenticate, authorizeHOD } = require('../middlewares/authMiddleware');
const hodController = require('../controllers/hodController');

// Add new student
router.post('/add-students', authenticate, authorizeHOD, hodController.addStudent);

// View department students
router.get('/students', authenticate, authorizeHOD, hodController.departmentStudents);

// Delete student
router.delete('/delete-student/:id', authenticate, authorizeHOD, hodController.deleteStudent);

// Edit student
router.put('/edit-student/:id', authenticate, authorizeHOD, hodController.editStudent);

// getStudentLeaves
router.get('/student-leaves', authenticate, authorizeHOD, hodController.getStudentLeaves);

// Approve leave request
router.put('/approve-leave/:leaveId', authenticate, authorizeHOD, hodController.approveLeave);

// Reject leave request
router.put('/reject-leave/:leaveId', authenticate, authorizeHOD, hodController.rejectLeave);



router.get('/dashboard', authenticate, authorizeHOD, hodController.getHodDashboard);
module.exports = router;
