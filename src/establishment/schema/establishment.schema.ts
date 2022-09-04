/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const EstablishmentSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: false,
    },
    name: { type: String, required: true },
    categorys: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categorys',
        required: false,
      },
    ],
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employees',
        required: false,
      },
    ],
    cedes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cedes',
        required: false,
      },
    ],
    serviceCatalog: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'services',
        required: false,
      },
    ],
    productCatalog: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
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
  },
  { timestamps: true },
);
