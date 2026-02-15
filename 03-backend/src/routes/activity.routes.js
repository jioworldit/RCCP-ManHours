const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activity.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { activityValidation } = require('../middleware/validation.middleware');

// All routes require authentication
router.use(authenticate);

// Generate activities for a project
router.post('/generate/:id', activityController.generateActivities);

// Get all activities for a project
router.get('/project/:id', activityController.getActivities);

// Bulk update activities
router.put('/project/:projectId/bulk', activityValidation.bulkUpdate, activityController.bulkUpdateActivities);

// Single activity operations
router.put('/:activityId', activityValidation.update, activityController.updateActivity);
router.delete('/:activityId', activityController.deleteActivity);

// Add manual activity
router.post('/project/:projectId/manual', activityController.addManualActivity);

module.exports = router;
