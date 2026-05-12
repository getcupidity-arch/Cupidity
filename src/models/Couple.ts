import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ICoupleDocument extends Document {
  _id: Types.ObjectId;
  users: Types.ObjectId[];
  anniversaryDate?: Date;
  relationshipType: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const coupleSchema = new Schema<ICoupleDocument>(
  {
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    anniversaryDate: {
      type: Date,
      default: null,
    },
    relationshipType: {
      type: String,
      default: 'dating',
      enum: ['dating', 'engaged', 'married', 'other'],
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'active', 'inactive'],
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

coupleSchema.index({ users: 1 });
coupleSchema.index({ status: 1 });

export const Couple = mongoose.model<ICoupleDocument>('Couple', coupleSchema);
