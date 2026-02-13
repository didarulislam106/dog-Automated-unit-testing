import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockDogData = {
  imageUrl: 'https://images.dog.ceo/breeds/husky/n02110185_1469.jpg',
  status: 'success',
};

vi.mock('../services/dogService', () => ({
  getRandomDogImage: vi.fn(),
}));

describe('dogController.getRandomDog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('success: returns 200 with success wrapper and data', async () => {
    const { getRandomDogImage } = await import('../services/dogService');
    (getRandomDogImage as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockDogData);

    const { getRandomDog } = await import('../controllers/dogController');

    const req = {} as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    await getRandomDog(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockDogData,
    });
  });
});
