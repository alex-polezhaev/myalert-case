import mongoose from 'mongoose'; /* eslint-disable-line import/no-unresolved */
import { dbPayment } from '../../mongoConnection.js';

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    success: {
      type: Boolean,
      default: null,
    },
    user_id: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
  { collection: 'orders' },
);

const Order = dbPayment.model('Order', orderSchema);

export default Order;
