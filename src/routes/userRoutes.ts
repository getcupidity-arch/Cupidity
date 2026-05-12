import { Router } from 'express';
import { userController } from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { updateProfileSchema } from '../validators/user.js';

const router = Router();

router.get('/profile', authenticate, userController.getProfile.bind(userController));

router.put(
  '/profile',
  authenticate,
  validate(updateProfileSchema),
  userController.updateProfile.bind(userController),
);

export default router;
