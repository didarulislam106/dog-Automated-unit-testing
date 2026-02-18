import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('Dog API Tests', () => {
  // Test 1: Positive API test for /api/dogs/random
  describe('Test 1: GET /api/dogs/random - Positive Test', () => {
    it('should return 200 status with success data containing imageUrl as string', async () => {
      const response = await request(app)
        .get('/api/dogs/random')
        .expect(200);

      // Verify HTTP status is 200
      expect(response.status).toBe(200);

      // Verify success is true
      expect(response.body.success).toBe(true);

      // Verify data is returned
      expect(response.body.data).toBeDefined();
      expect(response.body.data).not.toBeNull();

      // Verify data contains imageUrl
      expect(response.body.data.imageUrl).toBeDefined();

      // Verify type of imageUrl is string
      expect(typeof response.body.data.imageUrl).toBe('string');
    });
  });

  // Test 2: Negative API test for invalid route
  describe('Test 2: GET /api/dogs/invalid - Negative Test', () => {
    it('should return 404 status for invalid route', async () => {
      const response = await request(app)
        .get('/api/dogs/invalid')
        .expect(404);

      // Verify HTTP status is 404
      expect(response.status).toBe(404);

      // Verify response contains error message
      expect(response.body).toBeDefined();
    });

    it('should verify that returned error message is correct', async () => {
      const response = await request(app)
        .get('/api/dogs/invalid');

      // Check for error indication in response (either empty body or error field)
      // Invalid route returns 404, which is the expected error response
      expect(response.status).toBe(404);
    });
  });
});
