import { userRepository } from '../repositories/userRepository.js';
import { NotFoundError } from '../utils/errors.js';
import type { UpdateProfileInput } from '../validators/user.js';
import type { IUserDocument } from '../models/User.js';

export class UserService {
  async getProfile(userId: string): Promise<IUserDocument> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async updateProfile(userId: string, data: UpdateProfileInput): Promise<IUserDocument> {
    const user = await userRepository.updateProfile(userId, data);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }
}

export const userService = new UserService();
