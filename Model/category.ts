import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  { timestamps: true }
);

const Category: any = mongoose.model('Category', categorySchema);

export { Category };
