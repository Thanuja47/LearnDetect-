const express = require('express');
const { auth, authorize } = require('../middleware/auth.middleware');
const materialController = require('../controllers/assessmentMaterial.controller');

const router = express.Router();

// Public routes (for students to access materials)
router.get('/', auth, materialController.getMaterials);
router.get('/type/:type', auth, materialController.getMaterialsByType);
router.get('/:id', auth, materialController.getMaterialById);

// Protected routes (teachers/admins only)
router.post('/', auth, authorize('TEACHER', 'ADMIN'), materialController.createMaterial);
router.put('/:id', auth, authorize('TEACHER', 'ADMIN'), materialController.updateMaterial);
router.delete('/:id', auth, authorize('TEACHER', 'ADMIN'), materialController.deleteMaterial);

// Seed default materials (any authenticated user can seed if empty)
router.post('/seed', auth, materialController.seedDefaultMaterials);

module.exports = router;
