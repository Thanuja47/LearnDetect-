const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate.middleware');
const { auth, authorize } = require('../middleware/auth.middleware');
const reportController = require('../controllers/report.controller');

const router = express.Router();

// All routes require authentication and parent role
router.use(auth);
router.use(authorize('PARENT'));

// Report validation
const reportValidation = [
  body('childId').notEmpty().withMessage('Child ID is required'),
  body('title').notEmpty().withMessage('Title is required'),
  body('type').isIn(['Summary', 'Detailed', 'Quarterly']).withMessage('Invalid report type')
];

// Report routes
router.get('/', reportController.getReports);
router.get('/child/:childId', reportController.getChildReports);
router.get('/:id', reportController.getReportById);
router.post('/', reportValidation, validate, reportController.generateReport);
router.delete('/:id', reportController.deleteReport);

module.exports = router;
