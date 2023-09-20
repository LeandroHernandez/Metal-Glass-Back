import * as mongoose from 'mongoose';

export const EmployeeSchema = new mongoose.Schema(
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
    username: { type: String, required: true },
    password: { type: String, required: false },
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
  },
  { timestamps: true },
);

EmployeeSchema.index({ documentNumbe: 1 }, { unique: true });
EmployeeSchema.index({ username: 1 }, { unique: true });
