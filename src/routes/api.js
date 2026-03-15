/**
 * API v1 Routes
 * Main API endpoints for ecosystem and identity management
 */

const express = require('express');
const router = express.Router();
const { getEcosystem, reloadEcosystem } = require('../config/ecosystem');
const { asyncHandler } = require('../middleware/errorHandler');

/**
 * GET /api/v1/ecosystem
 * Returns the full service registry
 */
router.get('/ecosystem', asyncHandler(async (req, res) => {
  const ecosystem = getEcosystem();
  
  res.json({
    updatedAt: new Date().toISOString(),
    nodes: ecosystem
  });
}));

/**
 * GET /api/v1/identities
 * Returns identity registry information
 */
router.get('/identities', asyncHandler(async (req, res) => {
  // Future enhancement: scan identities/ directory
  res.json({
    message: "Identity Registry is active. See /api/v1/ecosystem for node mappings.",
    registryPath: "identities/",
    availableEndpoints: [
      '/api/v1/ecosystem',
      '/api/v1/identities'
    ]
  });
}));

/**
 * POST /api/v1/ecosystem/reload
 * Force reload of ecosystem configuration
 * Useful for manual cache invalidation
 */
router.post('/ecosystem/reload', asyncHandler(async (req, res) => {
  const adminToken = process.env.ADMIN_TOKEN;

  // Require a valid admin token to trigger a reload
  if (adminToken) {
    const providedToken = req.header('x-admin-token');
    if (providedToken !== adminToken) {
      return res.status(403).json({ error: 'Forbidden' });
    }
  } else if (process.env.NODE_ENV === 'production') {
    // In production, do not allow unauthenticated reloads if no admin token is configured
    return res.status(403).json({ error: 'Forbidden' });
  }

  const ecosystem = reloadEcosystem();
  
  res.json({
    message: 'Ecosystem configuration reloaded',
    timestamp: new Date().toISOString(),
    nodesCount: Object.keys(ecosystem).length
  });
}));

module.exports = router;
