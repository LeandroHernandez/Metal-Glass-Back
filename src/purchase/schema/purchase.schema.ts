import * as mongoose from 'mongoose';

export const PurchaseSchema = new mongoose.Schema(
  {
    establishment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'establishments',
      required: false,
    },
    cede: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'cedes',
      required: false,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: false,
    },
    // date: Date;
    // hora: Date;
    state: { type: String, required: true },
    subValue: { type: Number, required: true },
    discounts: { type: Number, required: false },
    totalValue: { type: Number, required: true },
    selectedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: false,
      },
    ],
  },
  { timestamps: true },
);
