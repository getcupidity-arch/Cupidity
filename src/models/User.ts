import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUserDocument extends Document {
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

const userSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    authProvider: {
      type: String,
      required: true,
      default: 'google',
      enum: ['google'],
    },
    bio: {
      type: String,
      default: '',
      maxlength: 500,
    },
    relationshipStatus: {
      type: String,
      default: 'single',
      enum: ['single', 'in_relationship', 'complicated', 'engaged', 'married'],
    },
    partnerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        const { __v, ...rest } = ret;
        return rest;
      },
    },
  },
);

userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });

export const User = mongoose.model<IUserDocument>('User', userSchema);
