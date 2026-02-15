const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authValidation } = require('../middleware/validation.middleware');
const { authenticate } = require('../middleware/auth.middleware');

// Public routes
router.post('/login', authValidation.login, authController.login);
router.post('/register', authValidation.register, authController.register);

// Protected routes
router.get('/profile', authenticate, authController.getProfile);

module.exports = router;
