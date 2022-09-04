import * as mongoose from 'mongoose';

export const PurchaseStatusSchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    description: { type: String, required: false },
  },
  { timestamps: true },
);
