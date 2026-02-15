const express = require('express');
const router = express.Router();
const componentController = require('../controllers/component.controller');
const { authenticate } = require('../middleware/auth.middleware');

// All routes require authentication
router.use(authenticate);

// Component routes for a project
router.get('/projects/:id/components', componentController.getComponents);
router.post('/projects/:id/components', componentController.createComponent);
router.post('/projects/:id/components/batch', componentController.saveComponents);

// Individual component operations
router.put('/components/:componentId', componentController.updateComponent);
router.delete('/components/:componentId', componentController.deleteComponent);

module.exports = router;
