import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IRelationshipActivityDocument extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  type: string;
  content: string;
  visibility: string;
  createdAt: Date;
  updatedAt: Date;
}

const relationshipActivitySchema = new Schema<IRelationshipActivityDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['date_planned', 'gift_sent', 'milestone', 'note', 'memory'],
    },
    content: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    visibility: {
      type: String,
      default: 'private',
      enum: ['private', 'partner', 'public'],
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

relationshipActivitySchema.index({ userId: 1, createdAt: -1 });

export const RelationshipActivity = mongoose.model<IRelationshipActivityDocument>(
  'RelationshipActivity',
  relationshipActivitySchema,
);
