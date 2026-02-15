const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/project.routes');
const activityRoutes = require('./routes/activity.routes');
const referenceRoutes = require('./routes/reference.routes');

// Import middleware
const errorHandler = require('./middleware/error.middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'rccp-manhours-api',
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/reference', referenceRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'RCCP Man-Hours Estimation API',
    version: '1.0.0',
    documentation: '/api/health'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   RCCP Man-Hours API Server                              ║
║   Running on port ${PORT}                                  ║
║   Environment: ${process.env.NODE_ENV || 'development'}                        ║
║                                                          ║
║   Endpoints:                                             ║
║   - Health:  http://localhost:${PORT}/api/health              ║
║   - Auth:    http://localhost:${PORT}/api/auth                ║
║   - Projects: http://localhost:${PORT}/api/projects           ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
