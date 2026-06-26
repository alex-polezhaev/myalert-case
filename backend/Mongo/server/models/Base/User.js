import mongoose from 'mongoose'; /* eslint-disable-line import/no-unresolved */
import { dbBase } from '../../mongoConnection.js';

const { Schema } = mongoose;

const createDefaultDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date;
};

const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    telegram_code: {
      type: String,
      default: Math.floor(100000 + Math.random() * 900000),
    },
    phone_number: {
      type: String,
    },
    trial_used: {
      type: Boolean,
      default: false,
    },
    telegram_id: {
      type: String,
    },
    rebill_id: {
      type: String,
    },
    expires_at: {
      type: Date,
      default: createDefaultDate(),
    },
    // Helps track the subscription renewal process. Without it, orders get duplicated.
    is_renewal_payment_in_progress: {
      type: Boolean,
      default: false,
    },
    card: {
      pan: { // "Pan": "430000******0777"
        type: String,
      },
      exp_date: { // "ExpDate": "1122"
        type: String,
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
  { collection: 'users' },
);

const User = dbBase.model('User', userSchema);

export default User;
