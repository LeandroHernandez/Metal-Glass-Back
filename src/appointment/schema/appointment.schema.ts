import * as mongoose from 'mongoose';

export const AppointmentSchema = new mongoose.Schema(
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
    state: { type: String, required: true },
    subValue: { type: Number, required: true },
    discounts: { type: Number, required: false },
    totalValue: { type: Number, required: true },
    selectedServices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'services',
        required: false,
      },
    ],
    //
    //   date: Date;
    //   hour: Date;
  },
  { timestamps: true },
);
