import * as mongoose from 'mongoose';

export const AditionalReferenceSchema = new mongoose.Schema(
  {
    reference: { type: String, required: true },
    description: { type: String, required: false },
  },
  { timestamps: true },
);
