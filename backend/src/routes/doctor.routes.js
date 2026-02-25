const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor.controller');
const { auth } = require('../middleware/auth.middleware');

// Public routes
router.get('/', doctorController.getAllDoctors);
router.get('/:id', doctorController.getDoctorById);
router.get('/:id/reviews', doctorController.getDoctorReviews);

// Protected routes (require authentication)
router.post('/:id/reviews', auth, doctorController.addDoctorReview);

// Admin only routes (auth middleware will check role)
router.post('/', auth, doctorController.createDoctor);
router.put('/:id', auth, doctorController.updateDoctor);
router.delete('/:id', auth, doctorController.deleteDoctor);

module.exports = router;
