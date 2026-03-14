/**
 * Unit tests for configuration modules
 */

const { getConfig } = require('../config/env');
const { loadEcosystem, getEcosystem, reloadEcosystem } = require('../config/ecosystem');

describe('Configuration Modules', () => {
  describe('Environment Configuration', () => {
    test('getConfig should return configuration object', () => {
      const config = getConfig();
      
      expect(config).toHaveProperty('nodeEnv');
      expect(config).toHaveProperty('port');
      expect(config).toHaveProperty('isDevelopment');
      expect(config).toHaveProperty('isProduction');
      expect(config).toHaveProperty('isTest');
    });

    test('should recognize test environment', () => {
      const config = getConfig();
      expect(config.isTest).toBe(true);
    });
  });

  describe('Ecosystem Configuration', () => {
    test('loadEcosystem should load configuration', () => {
      const ecosystem = loadEcosystem();
      expect(ecosystem).toBeDefined();
      expect(typeof ecosystem).toBe('object');
    });

    test('getEcosystem should return cached config', () => {
      const ecosystem1 = getEcosystem();
      const ecosystem2 = getEcosystem();
      expect(ecosystem1).toBe(ecosystem2); // Same reference
    });

    test('reloadEcosystem should force reload', () => {
      const ecosystem = reloadEcosystem();
      expect(ecosystem).toBeDefined();
      expect(typeof ecosystem).toBe('object');
    });
  });
});
