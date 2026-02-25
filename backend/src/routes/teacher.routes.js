const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate.middleware');
const { auth, authorize } = require('../middleware/auth.middleware');
const teacherController = require('../controllers/teacher.controller');

const router = express.Router();

// All routes require authentication and teacher role
router.use(auth);
router.use(authorize('TEACHER'));

// Student validation
const studentValidation = [
  body('name').notEmpty().withMessage('Student name is required'),
  body('studentCode').notEmpty().withMessage('Student code is required')
];

// Teacher dashboard
router.get('/dashboard', teacherController.getDashboard);
router.get('/performance', teacherController.getClassPerformance);
router.post('/reports/class', teacherController.generateClassReport);

// Student management
router.get('/students', teacherController.getStudents);
router.get('/students/:id', teacherController.getStudentById);
router.post('/students', studentValidation, validate, teacherController.addStudent);
router.put('/students/:id', teacherController.updateStudent);
router.delete('/students/:id', teacherController.removeStudent);

module.exports = router;
