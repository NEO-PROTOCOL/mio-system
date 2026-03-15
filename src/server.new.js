/**
 * MIO System API Server
 * Main application entry point with improved architecture
 */

const express = require('express');
const cors = require('cors');
const compression = require('compression');
const { getConfig } = require('./config/env');
const { loadEcosystem, watchEcosystem } = require('./config/ecosystem');
const { configureHelmet, configureRateLimit, configureWebhookRateLimit, verifyWebhookSignature } = require('./middleware/security');
const { configureLogging } = require('./middleware/logging');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Import routes
const homeRoutes = require('./routes/home');
const healthRoutes = require('./routes/health');
const apiRoutes = require('./routes/api');
const webhookRoutes = require('./routes/webhook');

// Initialize configuration
const config = getConfig();

// Create Express app
const app = express();

// Trust first proxy (e.g., when behind Railway/Heroku/nginx load balancer)
app.set('trust proxy', 1);

// ===== Security & Middleware =====
app.use(configureHelmet());
app.use(configureRateLimit());
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(configureLogging(config.isDevelopment));

// ===== Initialize Ecosystem =====
loadEcosystem();
if (!config.isTest) {
  watchEcosystem();
}

// ===== Routes =====
app.use('/', homeRoutes);
app.use('/', healthRoutes);
app.use('/api/v1', apiRoutes);
app.use('/api/webhook', configureWebhookRateLimit(), verifyWebhookSignature(config.webhookSecret), webhookRoutes);

// ===== Error Handling =====
app.use(notFoundHandler);
app.use(errorHandler);

// ===== Start Server =====
if (require.main === module) {
  const server = app.listen(config.port, () => {
    console.log(`🚀 MIO System API running on port ${config.port}`);
    console.log(`📊 Environment: ${config.nodeEnv}`);
    console.log(`🔒 Security: Helmet + Rate Limiting enabled`);
    console.log(`📝 Logging: ${config.isDevelopment ? 'Development' : 'Production'} mode`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('📴 SIGTERM received, shutting down gracefully...');
    server.close(() => {
      console.log('✅ Server closed');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('📴 SIGINT received, shutting down gracefully...');
    server.close(() => {
      console.log('✅ Server closed');
      process.exit(0);
    });
  });
}

// Export for testing
module.exports = app;
