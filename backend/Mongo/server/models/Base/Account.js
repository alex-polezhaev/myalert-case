import mongoose from 'mongoose';
import { dbBase } from '../../mongoConnection.js';

const { Schema } = mongoose;

const outputSchema = new Schema(
  {
    service: {
      type: String,
      required: true,
    },
    shared: {
      type: Boolean,
      default: false,
    },
    could_be_input: {
      type: Boolean,
      required: true,
    },
    could_be_output: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
  { collection: 'accounts' },
);

const Account = dbBase.model('Account', outputSchema);

export default Account;
