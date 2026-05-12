import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';
import { AUTH_COOKIE_NAME } from '../constants/index.js';
import { UnauthorizedError } from '../utils/errors.js';
import type { AuthenticatedRequest } from '../types/index.js';

export function authenticate(req: AuthenticatedRequest, _res: Response, next: NextFunction): void {
  try {
    const token =
      req.cookies?.[AUTH_COOKIE_NAME] ||
      extractBearerToken(req.headers.authorization);

    if (!token) {
      throw new UnauthorizedError('Authentication required');
    }

    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch {
    next(new UnauthorizedError('Invalid or expired token'));
  }
}

function extractBearerToken(header?: string): string | null {
  if (!header?.startsWith('Bearer ')) return null;
  return header.slice(7);
}
