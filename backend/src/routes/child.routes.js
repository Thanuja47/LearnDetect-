const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate.middleware');
const { auth, authorize } = require('../middleware/auth.middleware');
const childController = require('../controllers/child.controller');

const router = express.Router();

// All routes require authentication and parent role
router.use(auth);
router.use(authorize('PARENT'));

// Validation for adding/updating child
const childValidation = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('dateOfBirth').notEmpty().withMessage('Date of birth is required'),
  body('grade').notEmpty().withMessage('Grade is required'),
  body('gender').notEmpty().withMessage('Gender is required')
];

// Child CRUD routes
router.get('/', childController.getChildren);
router.get('/:id', childController.getChildById);
router.post('/', childValidation, validate, childController.addChild);
router.put('/:id', childController.updateChild);
router.delete('/:id', childController.deleteChild);

// Child specific data
router.get('/:id/assessments', childController.getChildAssessments);
router.get('/:id/progress', childController.getChildProgress);

module.exports = router;
