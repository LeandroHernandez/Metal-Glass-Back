import * as mongoose from 'mongoose';

export const PhotoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    // name_belongingTo: { type: String, required: true },
    // heOrIt_belongingTo: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   refs: [
    //     'users',
    //     'establishments',
    //     'employees',
    //     'cedes',
    //     'services',
    //     'products',
    //   ],
    //   required: false,
    // },
    photoPath: { type: String, required: true },
  },
  { timestamps: true },
);
