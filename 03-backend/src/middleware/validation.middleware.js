const { body, param, validationResult } = require('express-validator');

/**
 * Handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Request validation failed',
      details: errors.array()
    });
  }
  next();
};

/**
 * Project validation rules
 */
const projectValidation = {
  create: [
    body('projectNumber')
      .trim()
      .notEmpty().withMessage('Project number is required')
      .isLength({ max: 50 }).withMessage('Project number must be less than 50 characters'),
    body('customerName')
      .trim()
      .notEmpty().withMessage('Customer name is required')
      .isLength({ max: 255 }).withMessage('Customer name must be less than 255 characters'),
    body('productType')
      .notEmpty().withMessage('Product type is required')
      .isIn(['Vessel', 'Skid', 'Structure', 'EHouse']).withMessage('Invalid product type'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
    body('quantity')
      .optional()
      .isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    handleValidationErrors
  ],
  
  update: [
    param('id')
      .isUUID().withMessage('Invalid project ID'),
    body('customerName')
      .optional()
      .trim()
      .notEmpty().withMessage('Customer name cannot be empty')
      .isLength({ max: 255 }),
    body('description')
      .optional()
      .trim(),
    body('quantity')
      .optional()
      .isInt({ min: 1 }),
    body('status')
      .optional()
      .isIn(['DRAFT', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED']),
    handleValidationErrors
  ],

  getById: [
    param('id')
      .isUUID().withMessage('Invalid project ID'),
    handleValidationErrors
  ]
};

/**
 * Technical parameters validation
 */
const technicalParamsValidation = {
  create: [
    body('shellThicknessMm')
      .optional()
      .isFloat({ min: 0 }).withMessage('Shell thickness must be a positive number'),
    body('diameterMm')
      .optional()
      .isFloat({ min: 0 }),
    body('lengthMm')
      .optional()
      .isFloat({ min: 0 }),
    body('structuralWeightTons')
      .optional()
      .isFloat({ min: 0 }),
    body('materialGrade')
      .notEmpty().withMessage('Material grade is required'),
    body('materialCategory')
      .notEmpty()
      .isIn(['CS', 'SS', 'ALLOY', 'DUPLEX', 'ALUMINUM']),
    body('numNozzles')
      .optional()
      .isInt({ min: 0 }),
    body('linearWeldLengthM')
      .optional()
      .isFloat({ min: 0 }),
    handleValidationErrors
  ]
};

/**
 * Auth validation rules
 */
const authValidation = {
  login: [
    body('email')
      .isEmail().withMessage('Valid email is required')
      .normalizeEmail(),
    body('password')
      .notEmpty().withMessage('Password is required'),
    handleValidationErrors
  ],

  register: [
    body('email')
      .isEmail().withMessage('Valid email is required')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name')
      .trim()
      .notEmpty().withMessage('Name is required'),
    handleValidationErrors
  ]
};

/**
 * Activity validation
 */
const activityValidation = {
  update: [
    body('difficultyFactor')
      .optional()
      .isFloat({ min: 0.1, max: 5.0 }),
    body('efficiencyFactor')
      .optional()
      .isFloat({ min: 0.1, max: 1.0 }),
    body('crewSize')
      .optional()
      .isInt({ min: 1, max: 50 }),
    body('manualOverrideHours')
      .optional()
      .isFloat({ min: 0 }),
    handleValidationErrors
  ],

  bulkUpdate: [
    body('activityUpdates')
      .isArray().withMessage('activityUpdates must be an array'),
    body('activityUpdates.*.activityId')
      .isUUID().withMessage('Invalid activity ID'),
    handleValidationErrors
  ]
};

module.exports = {
  projectValidation,
  technicalParamsValidation,
  authValidation,
  activityValidation,
  handleValidationErrors
};
