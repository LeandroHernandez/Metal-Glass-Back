import * as mongoose from 'mongoose';

export const EmployeeSchema = new mongoose.Schema(
  {
    establishment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'establishments',
      required: false,
    },
    assignedCedes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cedes',
        required: false,
      },
    ],
    documentType: { type: String, required: true },
    documentNumber: { type: String, required: true },
    names: { type: String, required: true },
    surnames: { type: String, required: true },
    password: { type: String, required: true },
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'photos',
        required: false,
      },
    ],
    // permissions?: Ipermission;
    // chores: IChore;
  },
  { timestamps: true },
);
