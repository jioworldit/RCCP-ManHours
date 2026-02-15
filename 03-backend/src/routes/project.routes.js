const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { projectValidation, technicalParamsValidation } = require('../middleware/validation.middleware');

// All routes require authentication
router.use(authenticate);

// Project CRUD routes
router.get('/', projectController.getAllProjects);
router.post('/', projectValidation.create, projectController.createProject);
router.get('/:id', projectValidation.getById, projectController.getProjectById);
router.put('/:id', projectValidation.update, projectController.updateProject);
router.delete('/:id', projectValidation.getById, projectController.deleteProject);

// Technical parameters
router.post('/:id/technical-parameters', technicalParamsValidation.create, projectController.saveTechnicalParameters);

// Scope selections
router.post('/:id/scopes', projectController.saveScopeSelections);

module.exports = router;
