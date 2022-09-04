import * as mongoose from 'mongoose';

export const SubscriptionSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    numberOfServicesAllowed: { type: Number, required: false },
    numberOfProductsAllowed: { type: Number, required: false },
    numberOfEmployeesAllowed: { type: Number, required: false },
    appointmentAssignment: { type: Boolean, required: false },
    virtualEstablishmen: { type: Boolean, required: false },
    value: { type: Number, required: true },
    //allowedPhotoQuality?: number;
    //allowedVideoQuality?: number;
  },
  { timestamps: true },
);
