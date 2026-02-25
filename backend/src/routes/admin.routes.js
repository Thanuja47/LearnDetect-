const express = require('express');
const { auth, authorize } = require('../middleware/auth.middleware');
const adminController = require('../controllers/admin.controller');

const router = express.Router();

// All routes require authentication and admin role
router.use(auth);
router.use(authorize('ADMIN'));

// Admin dashboard routes
router.get('/dashboard', adminController.getDashboard);
router.get('/users', adminController.getUsers);
router.get('/analytics', adminController.getAnalytics);
router.get('/audit-logs', adminController.getAuditLogs);

module.exports = router;
