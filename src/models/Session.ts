import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ISessionDocument extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  token: string;
  userAgent?: string;
  ipAddress?: string;
  expiresAt: Date;
  createdAt: Date;
}

const sessionSchema = new Schema<ISessionDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    userAgent: {
      type: String,
      default: '',
    },
    ipAddress: {
      type: String,
      default: '',
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: {
      transform(_doc, ret) {
        const { __v, token, ...rest } = ret;
        return rest;
      },
    },
  },
);

sessionSchema.index({ userId: 1 });
sessionSchema.index({ token: 1 });

export const Session = mongoose.model<ISessionDocument>('Session', sessionSchema);
