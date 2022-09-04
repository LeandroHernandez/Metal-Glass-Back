import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    documentType: { type: String, required: true },
    documentNumber: { type: String, required: true },
    username: { type: String, required: true },
    names: { type: String, required: true },
    surnames: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    establishments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'establishments',
        required: false,
      },
    ],
    requestedAppointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appointments',
        required: false,
      },
    ],
    requestedPurchases: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'purchases',
        required: false,
      },
    ],
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'subscriptions',
      required: false,
    },
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'photos',
        required: false,
      },
    ],
    // active: { type: Boolean, required: true },
  },
  { timestamps: true },
);

UserSchema.index({ email: 1 }, { unique: true });
