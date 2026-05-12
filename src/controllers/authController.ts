import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService.js';
import { sendSuccess } from '../utils/response.js';
import { AUTH_COOKIE_NAME, COOKIE_OPTIONS } from '../constants/index.js';
import type { AuthenticatedRequest } from '../types/index.js';

export class AuthController {
  async googleAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { credential } = req.body;
      const userAgent = req.headers['user-agent'];
      const ipAddress = req.ip;

      const { user, token } = await authService.authenticateWithGoogle(
        credential,
        userAgent,
        ipAddress,
      );

      res.cookie(AUTH_COOKIE_NAME, token, COOKIE_OPTIONS);

      sendSuccess(res, { user, token }, 'Authentication successful');
    } catch (error) {
      next(error);
    }
  }

  async me(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await authService.getCurrentUser(req.userId!);
      sendSuccess(res, { user }, 'User fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const token = req.cookies?.[AUTH_COOKIE_NAME];
      if (token) {
        await authService.logout(token);
      }

      res.clearCookie(AUTH_COOKIE_NAME, { ...COOKIE_OPTIONS, maxAge: 0 });
      sendSuccess(res, null, 'Logged out successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
