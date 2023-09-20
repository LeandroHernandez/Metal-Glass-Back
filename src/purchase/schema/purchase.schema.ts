import * as mongoose from 'mongoose';

export const PurchaseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: false,
    },
    userName: { type: String, required: false },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employees',
      required: false,
    },
    employeeName: { type: String, required: false },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'clients',
      required: false,
    },
    clientName: { type: String, required: false },
    subValue: { type: Number, required: true },
    discounts: { type: Number, required: false },
    totalValue: { type: Number, required: true },
    selectedProducts: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products',
          required: true,
        },
        productName: { type: String, required: false },
        productPrice: { type: Number, required: false },
        quantityOfThisProductInThePurchase: { type: Number, required: true },
        required: false,
      },
    ],
  },
  { timestamps: true },
);
