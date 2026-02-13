import express, { Router } from 'express';
import { getRandomDog } from '../controllers/dogController';

const router = Router();

router.get('/random', getRandomDog);

export default router;
