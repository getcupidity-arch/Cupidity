import { Session, ISessionDocument } from '../models/Session.js';

export class SessionRepository {
  async create(data: {
    userId: string;
    token: string;
    userAgent?: string;
    ipAddress?: string;
    expiresAt: Date;
  }): Promise<ISessionDocument> {
    return Session.create(data);
  }

  async findByToken(token: string): Promise<ISessionDocument | null> {
    return Session.findOne({ token, expiresAt: { $gt: new Date() } });
  }

  async deleteByToken(token: string): Promise<void> {
    await Session.deleteOne({ token });
  }

  async deleteAllByUserId(userId: string): Promise<void> {
    await Session.deleteMany({ userId });
  }
}

export const sessionRepository = new SessionRepository();
