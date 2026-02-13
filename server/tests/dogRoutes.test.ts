import { describe, it, expect, vi } from 'vitest';
import express from 'express';
import request from 'supertest';

describe('dogRoutes', () => {
  it('success: GET /api/dogs/random returns 200 with success wrapper and data', async () => {
    vi.resetModules();

    const mockedImageUrl = 'https://images.dog.ceo/breeds/husky/n02110185_1469.jpg';

    vi.doMock('../controllers/dogController', () => ({
      getRandomDog: (_req: any, res: any) =>
        res.status(200).json({
          success: true,
          data: {
            imageUrl: mockedImageUrl,
            status: 'success',
          },
        }),
      getHealth: (_req: any, res: any) => res.status(200).json({ success: true }),
    }));

    const dogRoutes = (await import('../routes/dogRoutes')).default;
    const app = express();
    app.use('/api', dogRoutes);

    const response = await request(app).get('/api/dogs/random');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.imageUrl).toBe(mockedImageUrl);
    expect(response.body.data.status).toBe('success');
  });

  it('failure: GET /api/dogs/random returns 500 with error wrapper', async () => {
    vi.resetModules();

    vi.doMock('../controllers/dogController', () => ({
      getRandomDog: (_req: any, res: any) =>
        res.status(500).json({
          success: false,
          error: {
            message: 'Failed to fetch dog image',
            details: 'Network error',
          },
        }),
      getHealth: (_req: any, res: any) => res.status(200).json({ success: true }),
    }));

    const dogRoutes = (await import('../routes/dogRoutes')).default;
    const app = express();
    app.use('/api', dogRoutes);

    const response = await request(app).get('/api/dogs/random');

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.error.message).toBe('Failed to fetch dog image');
    expect(response.body.error.details).toBe('Network error');
  });
});
