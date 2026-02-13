import { Router } from 'express';
import { getRandomDog, getHealth } from '../controllers/dogController';

const router = Router();

router.get('/health', getHealth);
router.get('/dogs/random', getRandomDog);

export default router;
