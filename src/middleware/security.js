/**
 * Security Middleware
 * Implements security best practices for Express
 */

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');

/**
 * Configure helmet security headers
 */
function configureHelmet() {
  return helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:']
      }
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    }
  });
}

/**
 * Configure rate limiting
 */
function configureRateLimit() {
  return rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
      error: 'Too many requests',
      message: 'Please try again later'
    },
    standardHeaders: true,
    legacyHeaders: false
  });
}

/**
 * Configure stricter rate limiting for webhook endpoints
 */
function configureWebhookRateLimit() {
  return rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // Limit to 10 requests per minute
    message: {
      error: 'Too many webhook requests',
      message: 'Please try again later'
    },
    standardHeaders: true,
    legacyHeaders: false
  });
}

/**
 * Verify webhook signature
 * @param {string} secret - Webhook secret
 */
function verifyWebhookSignature(secret) {
  return (req, res, next) => {
    // If no secret is configured, skip verification
    if (!secret) {
      return next();
    }

    const signature = req.headers['x-webhook-signature'];
    
    if (!signature) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Missing webhook signature'
      });
    }

    try {
      // Prefer the raw request body (captured by upstream middleware) for signature verification
      // Fallback to JSON.stringify(req.body) to preserve existing behavior if no raw body is available
      const rawBody = req.rawBody || req.bodyRaw || null;
      const payload = rawBody != null
        ? (Buffer.isBuffer(rawBody) ? rawBody : String(rawBody))
        : JSON.stringify(req.body);
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');

      if (signature !== expectedSignature) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'Invalid webhook signature'
        });
      }

      next();
    } catch {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Error verifying signature'
      });
    }
  };
}

/**
 * Sanitize user input to prevent log injection
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return input;
  }
  // Remove newlines and other control characters
  return input.replace(/[\r\n\t]/g, '');
}

module.exports = {
  configureHelmet,
  configureRateLimit,
  configureWebhookRateLimit,
  verifyWebhookSignature,
  sanitizeInput
};
