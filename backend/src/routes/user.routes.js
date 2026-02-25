const express = require('express');
const { auth, authorize } = require('../middleware/auth.middleware');
const userController = require('../controllers/user.controller');

const router = express.Router();

// All routes require authentication
router.use(auth);

// Get all users (Admin only)
router.get('/', authorize('ADMIN'), userController.getAllUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

// Update user
router.put('/:id', userController.updateUser);

// Delete user (Admin only)
router.delete('/:id', authorize('ADMIN'), userController.deleteUser);

// Reset password (Admin only)
router.post('/:id/reset-password', authorize('ADMIN'), userController.resetPassword);

module.exports = router;
