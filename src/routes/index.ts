import { Router } from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'Cupidity API is running', timestamp: new Date().toISOString() });
});

export default router;
