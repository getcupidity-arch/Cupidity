import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { googleAuthSchema } from '../validators/auth.js';

const router = Router();

router.post(
  '/google',
  authLimiter,
  validate(googleAuthSchema),
  authController.googleAuth.bind(authController),
);

router.get('/me', authenticate, authController.me.bind(authController));

router.post('/logout', authenticate, authController.logout.bind(authController));

export default router;
