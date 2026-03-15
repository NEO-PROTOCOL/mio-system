/**
 * Webhook Routes
 * Endpoints for receiving webhook events
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { asyncHandler } = require('../middleware/errorHandler');
const { sanitizeInput } = require('../middleware/security');

/**
 * POST /api/webhook/nexus
 * Nexus-compatible webhook endpoint
 * Validates incoming webhook events
 */
router.post(
  '/nexus',
  [
    // Validation middleware
    body('event')
      .exists().withMessage('Event field is required')
      .isString().withMessage('Event must be a string')
      .trim()
      .isLength({ min: 1, max: 100 }).withMessage('Event must be 1-100 characters'),
    body('payload')
      .optional()
      .isObject().withMessage('Payload must be an object')
  ],
  asyncHandler(async (req, res) => {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { event, payload } = req.body;

    // Log webhook receipt (without user-controlled data to prevent log injection)
    console.log('[MIO] Webhook received:', {
      event: sanitizeInput(event),
      timestamp: new Date().toISOString()
    });

    // In a real system, this would:
    // 1. Verify webhook signature
    // 2. Queue the event for processing
    // 3. Emit to event handlers

    res.status(200).json({
      status: 'accepted',
      event: sanitizeInput(event),
      receivedAt: new Date().toISOString(),
      payload: payload || {}
    });
  })
);

module.exports = router;
