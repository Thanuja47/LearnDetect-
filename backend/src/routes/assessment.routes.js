const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate.middleware');
const { auth, authorize } = require('../middleware/auth.middleware');
const assessmentController = require('../controllers/assessment.controller');

const router = express.Router();

// All routes require authentication
router.use(auth);

// Analysis validation
const analysisValidation = [
  body('expectedText').notEmpty().withMessage('Expected text is required'),
  body('recognizedText').notEmpty().withMessage('Recognized text is required'),
  body('duration').optional().isFloat({ min: 0 }).withMessage('Duration must be a positive number')
];

// Assessment validation
const assessmentValidation = [
  body('type').isIn(['phoneme', 'word', 'passage', 'comprehension']).withMessage('Invalid assessment type'),
  body('wordAccuracy').isFloat({ min: 0, max: 100 }).withMessage('Word accuracy must be between 0-100'),
  body('pronunciation').isFloat({ min: 0, max: 100 }).withMessage('Pronunciation must be between 0-100'),
  body('readingSpeed').isFloat({ min: 0, max: 100 }).withMessage('Reading speed must be between 0-100'),
  body('fluency').isFloat({ min: 0, max: 100 }).withMessage('Fluency must be between 0-100'),
  body('comprehension').isFloat({ min: 0, max: 100 }).withMessage('Comprehension must be between 0-100')
];

// Speech analysis route (for all authenticated users)
router.post('/analyze', analysisValidation, validate, assessmentController.analyzeReading);

// Student assessment routes
router.post('/', authorize('STUDENT'), assessmentValidation, validate, assessmentController.submitAssessment);
router.get('/', authorize('STUDENT'), assessmentController.getAssessments);
router.get('/:id', assessmentController.getAssessmentById);

// Child assessment routes (for parents)
router.post('/child/:childId', authorize('PARENT'), assessmentValidation, validate, assessmentController.submitChildAssessment);

module.exports = router;
