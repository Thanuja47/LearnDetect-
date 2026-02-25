const express = require('express');
const { auth, authorize } = require('../middleware/auth.middleware');
const studentController = require('../controllers/student.controller');
const scheduleController = require('../controllers/schedule.controller');

const router = express.Router();

// All routes require authentication
router.use(auth);

// Student routes
router.get('/dashboard', authorize('STUDENT'), studentController.getDashboard);
router.get('/profile', authorize('STUDENT'), studentController.getProfile);
router.put('/profile', authorize('STUDENT'), studentController.updateProfile);
router.get('/assessments', authorize('STUDENT'), studentController.getAssessments);
router.get('/progress', authorize('STUDENT'), studentController.getProgress);
router.get('/achievements', authorize('STUDENT'), studentController.getAchievements);
router.get('/stats', authorize('STUDENT'), studentController.getQuickStats);
router.get('/schedules', authorize('STUDENT'), scheduleController.getStudentSchedules);

module.exports = router;
