import * as mongoose from 'mongoose';

export const TypeDocumentSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    description: { type: String, required: false },
  },
  { timestamps: true },
);
