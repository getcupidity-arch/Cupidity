import { Request } from 'express';
import { Types } from 'mongoose';

export interface JwtPayload {
  userId: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export interface GoogleUserInfo {
  sub: string;
  name: string;
  email: string;
  picture: string;
  email_verified: boolean;
}

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  profilePicture: string;
  googleId: string;
  authProvider: string;
  bio: string;
  relationshipStatus: string;
  partnerId?: Types.ObjectId;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICouple {
  _id: Types.ObjectId;
  users: Types.ObjectId[];
  anniversaryDate?: Date;
  relationshipType: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRelationshipActivity {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  type: string;
  content: string;
  visibility: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface INotification {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  description: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISession {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  token: string;
  userAgent?: string;
  ipAddress?: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}
