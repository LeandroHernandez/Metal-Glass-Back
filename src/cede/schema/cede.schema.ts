/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const CedeSchema = new mongoose.Schema(
  {
    establishment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'establishments',
      required: false,
    },
    name: { type: String, required: true },
    ubication: {
      lat: { type: Number, required: true },
      long: { type: Number, required: true },
      country: { type: String, required: true },
      region: { type: String, required: true },
      city: { type: String, required: true },
      direction: { type: String, required: true },
    },
    servicesCatalog: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'services',
        required: false,
      },
    ],
    productsCatalog: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
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
    shoppingHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'purchases',
        required: false,
      },
    ],
    // photos: { type: [], required: false },
    // photos: { type: Array<Express.Multer.File>, required: false },
    // photos: { type: Array<string>, required: true },
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'photos',
        required: false,
      },
    ],
  },
  { timestamps: true },
);
