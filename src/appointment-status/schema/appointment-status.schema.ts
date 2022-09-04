import * as mongoose from 'mongoose';

export const AppointmentStatusSchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    description: { type: String, required: false },
  },
  { timestamps: true },
);
