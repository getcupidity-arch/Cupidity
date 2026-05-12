import { User, IUserDocument } from '../models/User.js';
import type { UpdateProfileInput } from '../validators/user.js';

export class UserRepository {
  async findById(id: string): Promise<IUserDocument | null> {
    return User.findById(id).select('-__v');
  }

  async findByEmail(email: string): Promise<IUserDocument | null> {
    return User.findOne({ email });
  }

  async findByGoogleId(googleId: string): Promise<IUserDocument | null> {
    return User.findOne({ googleId });
  }

  async create(data: {
    name: string;
    email: string;
    profilePicture: string;
    googleId: string;
    authProvider: string;
  }): Promise<IUserDocument> {
    return User.create(data);
  }

  async updateProfile(id: string, data: UpdateProfileInput): Promise<IUserDocument | null> {
    return User.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
  }

  async updateLastLogin(id: string): Promise<void> {
    await User.findByIdAndUpdate(id, { lastLogin: new Date() });
  }
}

export const userRepository = new UserRepository();
