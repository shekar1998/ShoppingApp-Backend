import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  },
  { timestamps: true }
);

const OrderItem: any = mongoose.model('OrderItem', orderItemSchema);

export { OrderItem };
