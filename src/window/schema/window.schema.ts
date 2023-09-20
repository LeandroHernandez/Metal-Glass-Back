import * as mongoose from 'mongoose';

export const WindowSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    accessories: [
      {
        accessory: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'accessories',
          required: false,
        },
        amountOfAccessories: { type: Number, required: true },
      },
    ],
    profiles: [
      {
        profile: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'profiles',
          required: false,
        },
        numberOfMeters: { type: Number, required: true },
      },
    ],
    glasses: [
      {
        glass: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'glasses',
          required: false,
        },
        numberOfSquareMeters: { type: Number, required: true },
      },
    ],
    acrylics: [
      {
        acrylic: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'acrylics',
          required: false,
        },
        numberOfSquareMeters: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true },
);
