import { Request, Response } from 'express';
import { getRandomDogImage } from '../services/dogService';

export async function getRandomDog(req: Request, res: Response) {
  try {
    const result = await getRandomDogImage();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to fetch dog image',
        details: errorMessage,
      },
    });
  }
}

export async function getHealth(req: Request, res: Response) {
  res.status(200).json({
    success: true,
  });
}
