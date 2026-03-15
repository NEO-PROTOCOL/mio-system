/**
 * Unit tests for middleware modules
 */

const { sanitizeInput } = require('../middleware/security');

describe('Middleware Modules', () => {
  describe('Security Middleware', () => {
    test('sanitizeInput should remove control characters', () => {
      const input = 'test\r\n\tinput';
      const sanitized = sanitizeInput(input);
      expect(sanitized).toBe('testinput');
    });

    test('sanitizeInput should handle non-string input', () => {
      expect(sanitizeInput(123)).toBe(123);
      expect(sanitizeInput(null)).toBe(null);
      expect(sanitizeInput(undefined)).toBe(undefined);
      expect(sanitizeInput({})).toEqual({});
    });

    test('sanitizeInput should handle clean strings', () => {
      const input = 'clean input';
      const sanitized = sanitizeInput(input);
      expect(sanitized).toBe('clean input');
    });
  });
});
