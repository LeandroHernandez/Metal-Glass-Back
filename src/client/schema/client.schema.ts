import * as mongoose from 'mongoose';

export const ClientSchema = new mongoose.Schema(
  {
    // documentType: { type: String, required: true },
    documentType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'types_documents',
      required: false,
    },
    documentNumber: { type: String, required: true },
    names: { type: String, required: true },
    surnames: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    email: { type: String, required: false },
    shoppingHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'purchases',
        required: false,
      },
    ],
    datingHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appointments',
        required: false,
      },
    ],
    customerGrade: { type: String, required: false },
    Nit: { type: String, required: false },
    Contact: { type: String, required: false },
    Address: { type: String, required: false },
    City: { type: String, required: false },
  },
  { timestamps: true },
);

// ClientSchema.index({ email: 1 }, { unique: true });
