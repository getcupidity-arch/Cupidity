import { OAuth2Client } from 'google-auth-library';
import { env } from '../config/env.js';
import { userRepository } from '../repositories/userRepository.js';
import { sessionRepository } from '../repositories/sessionRepository.js';
import { generateToken, getTokenExpiry } from '../utils/jwt.js';
import { UnauthorizedError } from '../utils/errors.js';
import type { IUserDocument } from '../models/User.js';

const googleClient = new OAuth2Client(env.googleClientId);

export class AuthService {
  async authenticateWithGoogle(
    credential: string,
    userAgent?: string,
    ipAddress?: string,
  ): Promise<{ user: IUserDocument; token: string }> {
    const payload = await this.verifyGoogleToken(credential);

    let user = await userRepository.findByGoogleId(payload.sub);

    if (!user) {
      user = await userRepository.create({
        name: payload.name || '',
        email: payload.email || '',
        profilePicture: payload.picture || '',
        googleId: payload.sub,
        authProvider: 'google',
      });
    } else {
      await userRepository.updateLastLogin(user._id.toString());
    }

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
    });

    await sessionRepository.create({
      userId: user._id.toString(),
      token,
      userAgent,
      ipAddress,
      expiresAt: getTokenExpiry(),
    });

    return { user, token };
  }

  async logout(token: string): Promise<void> {
    await sessionRepository.deleteByToken(token);
  }

  async getCurrentUser(userId: string): Promise<IUserDocument> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedError('User not found');
    }
    return user;
  }

  private async verifyGoogleToken(credential: string) {
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: env.googleClientId,
      });

      const payload = ticket.getPayload();
      if (!payload || !payload.email_verified) {
        throw new UnauthorizedError('Invalid Google token or email not verified');
      }

      return payload;
    } catch (error) {
      if (error instanceof UnauthorizedError) throw error;
      throw new UnauthorizedError('Failed to verify Google token');
    }
  }
}

export const authService = new AuthService();
