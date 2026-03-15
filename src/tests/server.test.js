/**
 * Integration tests for MIO System API
 */

const request = require('supertest');

// Set test environment
process.env.NODE_ENV = 'test';

const app = require('../server.new');

describe('MIO System API', () => {
  describe('Health Check', () => {
    test('GET /health should return 200 and service status', async () => {
      const response = await request(app)
        .get('/health')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('status', 'UP');
      expect(response.body).toHaveProperty('service', 'mio-system-api');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
    });
  });

  describe('Home Route', () => {
    test('GET / should return HTML landing page', async () => {
      const response = await request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200);

      expect(response.text).toContain('MIO System API');
      expect(response.text).toContain('/health');
      expect(response.text).toContain('/api/v1/ecosystem');
    });
  });

  describe('Ecosystem API', () => {
    test('GET /api/v1/ecosystem should return ecosystem data', async () => {
      const response = await request(app)
        .get('/api/v1/ecosystem')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('updatedAt');
      expect(response.body).toHaveProperty('nodes');
    });

    test('POST /api/v1/ecosystem/reload should reload configuration', async () => {
      const response = await request(app)
        .post('/api/v1/ecosystem/reload')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body.message).toContain('reloaded');
    });
  });

  describe('Identities API', () => {
    test('GET /api/v1/identities should return identity info', async () => {
      const response = await request(app)
        .get('/api/v1/identities')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('registryPath');
      expect(response.body).toHaveProperty('availableEndpoints');
    });
  });

  describe('Webhook API', () => {
    test('POST /api/webhook/nexus should accept valid webhook', async () => {
      const payload = {
        event: 'test.event',
        payload: { test: 'data' }
      };

      const response = await request(app)
        .post('/api/webhook/nexus')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('status', 'accepted');
      expect(response.body).toHaveProperty('event', 'test.event');
      expect(response.body).toHaveProperty('receivedAt');
    });

    test('POST /api/webhook/nexus should reject missing event', async () => {
      const payload = {
        payload: { test: 'data' }
      };

      const response = await request(app)
        .post('/api/webhook/nexus')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Bad Request');
    });

    test('POST /api/webhook/nexus should reject invalid event type', async () => {
      const payload = {
        event: 123, // Not a string
        payload: { test: 'data' }
      };

      const response = await request(app)
        .post('/api/webhook/nexus')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    test('POST /api/webhook/nexus should reject event that is too long', async () => {
      const payload = {
        event: 'a'.repeat(101), // More than 100 characters
        payload: { test: 'data' }
      };

      const response = await request(app)
        .post('/api/webhook/nexus')
        .send(payload)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Error Handling', () => {
    test('GET /nonexistent should return 404', async () => {
      const response = await request(app)
        .get('/nonexistent')
        .expect('Content-Type', /json/)
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Not Found');
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('Security Headers', () => {
    test('Should include security headers', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      // Check for helmet security headers
      expect(response.headers).toHaveProperty('x-content-type-options');
      expect(response.headers).toHaveProperty('x-frame-options');
      expect(response.headers).toHaveProperty('strict-transport-security');
    });
  });

  describe('CORS', () => {
    test('Should allow cross-origin requests', async () => {
      const response = await request(app)
        .get('/health')
        .set('Origin', 'http://example.com')
        .expect(200);

      expect(response.headers).toHaveProperty('access-control-allow-origin');
    });
  });
});
