import * as mongoose from 'mongoose';

export const ProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    pricePerMeter: { type: Number, required: true },
  },
  { timestamps: true },
);
