import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('dogService.getRandomDogImage', () => {
  const mockedImageUrl = 'https://images.dog.ceo/breeds/husky/n02110185_1469.jpg';

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('success: returns imageUrl and status on successful fetch', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        message: mockedImageUrl,
        status: 'success',
      }),
    });

    vi.stubGlobal('fetch', fetchMock);

    const { getRandomDogImage } = await import('../services/dogService');

    const result = await getRandomDogImage();

    expect(result.imageUrl).toBe(mockedImageUrl);
    expect(result.status).toBe('success');
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith('https://dog.ceo/api/breeds/image/random');
  });

  it('failure: throws error with correct message on non-ok response', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    vi.stubGlobal('fetch', fetchMock);

    const { getRandomDogImage } = await import('../services/dogService');

    await expect(getRandomDogImage()).rejects.toThrow(
      'Failed to fetch dog image: Dog API returned status 500'
    );
  });
});
