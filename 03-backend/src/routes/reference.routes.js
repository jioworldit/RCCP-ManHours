const express = require('express');
const router = express.Router();
const referenceController = require('../controllers/reference.controller');
const { authenticate } = require('../middleware/auth.middleware');

// All routes require authentication
router.use(authenticate);

// Reference data routes
router.get('/material-grades', referenceController.getMaterialGrades);
router.get('/welding-processes', referenceController.getWeldingProcesses);
router.get('/scope-types', referenceController.getScopeTypes);
router.get('/calculation-rules', referenceController.getCalculationRules);

module.exports = router;
