const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate.middleware');
const { auth, authorize } = require('../middleware/auth.middleware');
const scheduleController = require('../controllers/schedule.controller');

const router = express.Router();

// All routes require authentication and teacher role
router.use(auth);
router.use(authorize('TEACHER'));

// Schedule validation
const scheduleValidation = [
  body('date').notEmpty().withMessage('Date is required'),
  body('time').notEmpty().withMessage('Time is required'),
  body('duration').isInt({ min: 1 }).withMessage('Duration must be a positive number'),
  body('type').isIn(['phoneme', 'word', 'passage', 'comprehension']).withMessage('Invalid assessment type')
];

// Schedule CRUD routes
router.get('/', scheduleController.getSchedules);
router.get('/:id', scheduleController.getScheduleById);
router.post('/', scheduleValidation, validate, scheduleController.createSchedule);
router.put('/:id', scheduleController.updateSchedule);
router.delete('/:id', scheduleController.deleteSchedule);

module.exports = router;
