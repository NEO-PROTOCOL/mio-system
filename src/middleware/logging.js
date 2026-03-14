/**
 * Logging Middleware
 * Provides request logging with sanitization
 */

const morgan = require('morgan');

/**
 * Create custom morgan token for sanitized user-agent
 */
morgan.token('sanitized-user-agent', (req) => {
  const ua = req.get('user-agent') || 'unknown';
  // Remove any control characters
  return ua.replace(/[\r\n\t]/g, '');
});

/**
 * Configure request logging
 */
function configureLogging(isDevelopment = false) {
  if (isDevelopment) {
    // Detailed logging in development
    return morgan('dev');
  }
  
  // Compact logging in production with sanitization
  return morgan(
    ':method :url :status :res[content-length] - :response-time ms :sanitized-user-agent',
    {
      skip: (req) => {
        // Skip health check logs to reduce noise
        return req.path === '/health';
      }
    }
  );
}

module.exports = { configureLogging };
