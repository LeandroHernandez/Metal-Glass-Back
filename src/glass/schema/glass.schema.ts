import * as mongoose from 'mongoose';

export const GlassSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    pricePerSquareMeter: { type: Number, required: true },
  },
  { timestamps: true },
);
