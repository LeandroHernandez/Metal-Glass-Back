import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    // documentType: { type: String, required: true },
    documentType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'types_documents',
      required: false,
    },
    documentNumber: { type: String, required: true },
    username: { type: String, required: true },
    names: { type: String, required: true },
    surnames: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: true },
    historyOfAdvisedPurchases: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'purchases',
        required: false,
      },
    ],
    historyOfCounselingAppointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'appointments',
        required: false,
      },
    ],
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'photos',
        required: false,
      },
    ],
    whatIHaveAssignedToOthers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'assignments',
        required: false,
      },
    ],
    whatOthersHaveAssignedToMe: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'assignments',
        required: false,
      },
    ],
    // active: { type: Boolean, required: true },
  },
  { timestamps: true },
);

UserSchema.index({ documentNumber: 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });
