/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    discount: { type: Number, required: false },
    amount: { type: Number, required: false },
    numberOfRequests: { type: Number, required: false },
    // photos: { type: Array<string>, required: false },
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'photos',
        required: false,
      },
    ],
  },
  { timestamps: true },
);
