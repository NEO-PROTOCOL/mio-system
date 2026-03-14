/**
 * Error Handling Middleware
 * Centralizes error handling for the application
 */

const { getConfig } = require('../config/env');

/**
 * Not Found (404) handler
 */
function notFoundHandler(req, res) {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString()
  });
}

/**
 * Global error handler
 */
function errorHandler(err, req, res, _next) {
  const config = getConfig();
  
  // Log error (in production, this would go to a logging service)
  console.error('❌ Error:', {
    message: err.message,
    stack: config.isDevelopment ? err.stack : undefined,
    path: req.path,
    method: req.method
  });

  // Determine status code
  const statusCode = err.statusCode || err.status || 500;

  // Build error response
  const errorResponse = {
    error: err.name || 'Internal Server Error',
    message: err.message || 'An unexpected error occurred',
    timestamp: new Date().toISOString()
  };

  // Include stack trace in development
  if (config.isDevelopment && err.stack) {
    errorResponse.stack = err.stack;
  }

  res.status(statusCode).json(errorResponse);
}

/**
 * Async route handler wrapper
 * Catches errors in async functions and passes to error handler
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = {
  notFoundHandler,
  errorHandler,
  asyncHandler
};
