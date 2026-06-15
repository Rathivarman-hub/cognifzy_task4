import { body } from 'express-validator';

export const validateForm = [
  body('fullName')
    .trim()
    .isLength({ min: 3 }).withMessage('Full name must be at least 3 characters'),

  body('email')
    .trim()
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain at least 1 uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain at least 1 number')
    .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/).withMessage('Password must contain at least 1 special character'),

  body('phone')
    .matches(/^\d{10}$/).withMessage('Phone must be exactly 10 digits'),

  body('dob')
    .notEmpty().withMessage('Date of birth is required')
    .isDate().withMessage('Invalid date of birth'),

  body('gender')
    .notEmpty().withMessage('Gender is required')
    .isIn(['male', 'female', 'non-binary', 'prefer-not-to-say']).withMessage('Invalid gender value'),
];
