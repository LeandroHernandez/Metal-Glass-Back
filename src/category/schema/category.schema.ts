import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    fatherCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'categorys' },
    subCategorys: [{ type: mongoose.Schema.Types.ObjectId, ref: 'categorys' }],
  },
  { timestamps: true },
);
