const express = require('express');
const { auth, authorize } = require('../middleware/auth.middleware');
const parentController = require('../controllers/parent.controller');

const router = express.Router();

// All routes require authentication and parent role
router.use(auth);
router.use(authorize('PARENT'));

// Parent routes
router.get('/dashboard', parentController.getDashboard);
router.get('/progress', parentController.getProgress);
router.get('/insights', parentController.getInsights);

module.exports = router;
