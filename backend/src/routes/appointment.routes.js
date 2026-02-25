const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');
const { auth } = require('../middleware/auth.middleware');

// All appointment routes require authentication
router.use(auth);

router.get('/', appointmentController.getAllAppointments);
router.get('/:id', appointmentController.getAppointmentById);
router.post('/', appointmentController.createAppointment);
router.put('/:id', appointmentController.updateAppointment);
router.put('/:id/cancel', appointmentController.cancelAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;
