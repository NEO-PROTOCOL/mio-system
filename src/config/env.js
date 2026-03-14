/**
 * Environment Configuration
 * Validates and exports environment variables
 */

const requiredEnvVars = ['NODE_ENV'];
const optionalEnvVars = {
  PORT: 8080,
  WEBHOOK_SECRET: null, // Optional webhook signature verification
  LOG_LEVEL: 'info'
};

/**
 * Validate required environment variables
 */
function validateEnv() {
  const missing = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.warn(`⚠️  Missing recommended env vars: ${missing.join(', ')}`);
    console.warn('   Setting defaults...');
    
    // Set defaults for missing vars
    if (!process.env.NODE_ENV) {
      process.env.NODE_ENV = 'development';
    }
  }
}

/**
 * Get environment configuration
 */
function getConfig() {
  validateEnv();
  
  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || optionalEnvVars.PORT,
    webhookSecret: process.env.WEBHOOK_SECRET || optionalEnvVars.WEBHOOK_SECRET,
    logLevel: process.env.LOG_LEVEL || optionalEnvVars.LOG_LEVEL,
    isDevelopment: (process.env.NODE_ENV || 'development') === 'development',
    isProduction: (process.env.NODE_ENV || 'development') === 'production',
    isTest: (process.env.NODE_ENV || 'development') === 'test'
  };
}

module.exports = { getConfig, validateEnv };
