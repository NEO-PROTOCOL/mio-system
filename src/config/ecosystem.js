/**
 * Ecosystem Configuration Loader
 * Manages loading and caching of ecosystem.json
 */

const fs = require('fs');
const path = require('path');

const ecosystemPath = path.join(__dirname, '..', '..', 'ecosystem.json');

let cachedConfig = null;
let lastModified = null;

/**
 * Load ecosystem configuration from file
 * @returns {Object} Ecosystem configuration
 */
function loadEcosystem() {
  try {
    if (!fs.existsSync(ecosystemPath)) {
      console.error('⚠️ Ecosystem file not found:', ecosystemPath);
      return {};
    }

    const stats = fs.statSync(ecosystemPath);
    const currentModified = stats.mtime.getTime();

    // Return cached version if file hasn't changed
    if (cachedConfig && lastModified === currentModified) {
      return cachedConfig;
    }

    const data = fs.readFileSync(ecosystemPath, 'utf8');
    cachedConfig = JSON.parse(data);
    lastModified = currentModified;
    
    console.log('✅ Ecosystem configuration loaded.');
    return cachedConfig;
  } catch (error) {
    console.error('❌ Error loading ecosystem:', error.message);
    // Return cached config if available, empty object otherwise
    return cachedConfig || {};
  }
}

/**
 * Get cached ecosystem configuration
 * @returns {Object} Cached ecosystem configuration
 */
function getEcosystem() {
  if (!cachedConfig) {
    return loadEcosystem();
  }
  return cachedConfig;
}

/**
 * Force reload of ecosystem configuration
 * @returns {Object} Reloaded ecosystem configuration
 */
function reloadEcosystem() {
  lastModified = null;
  return loadEcosystem();
}

/**
 * Watch ecosystem file for changes
 */
function watchEcosystem() {
  if (fs.existsSync(ecosystemPath)) {
    fs.watch(ecosystemPath, (eventType) => {
      if (eventType === 'change') {
        console.log('📝 Ecosystem file changed, reloading...');
        reloadEcosystem();
      }
    });
    console.log('👁️  Watching ecosystem file for changes');
  }
}

module.exports = {
  loadEcosystem,
  getEcosystem,
  reloadEcosystem,
  watchEcosystem
};
