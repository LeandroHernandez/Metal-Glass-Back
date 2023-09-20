import * as mongoose from 'mongoose';

export const AccessorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
  },
  { timestamps: true },
);
