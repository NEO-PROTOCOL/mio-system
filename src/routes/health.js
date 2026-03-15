/**
 * Health Check Routes
 * Endpoints for monitoring service health
 */

const express = require('express');
const router = express.Router();

/**
 * GET /health
 * Health check endpoint for monitoring
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    service: 'mio-system-api',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

module.exports = router;
