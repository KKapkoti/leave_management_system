//middlewares/validateRegistration.js
//from validation with ZOD

const { body, validationResult } = require('express-validator');

const validateMiddleware = async (req, res, next) => {
  try {
    // Define validation rules
    const validations = [
      body('department').trim().notEmpty().withMessage('Department is required')
        .isIn(['C.S.E', 'Civil', 'Mechanical', 'AI&ML', 'Robotics & Automation'])
        .withMessage('Invalid department'),
      body('name').trim().notEmpty().withMessage('Name is required'),
      body('password').trim().notEmpty().withMessage('Password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
      body('phone').trim().notEmpty().withMessage('Phone is required')
        .isMobilePhone('any').withMessage('Invalid phone number')
        .isLength({ min: 10 }).withMessage('Phone number must be at least 10 characters long'),
      body('gender').trim().notEmpty().withMessage('Gender is required')
        .isIn(['male', 'female']).withMessage('Invalid gender'),
      body('email').trim().notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email address'),
      body('dateOfBirth').trim().notEmpty().withMessage('Date of Birth is required')
        .isISO8601().toDate().withMessage('Invalid date format'), // Assuming dateOfBirth is expected in ISO8601 format
    ];

    // Execute validations
    await Promise.all(validations.map(validation => validation.run(req)));

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Proceed to the next middleware if no errors
    next();
  } catch (error) {
    next(error);
    // console.error(error);
    // res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {validateMiddleware};











