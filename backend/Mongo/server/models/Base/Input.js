import mongoose from 'mongoose'; // eslint-disable-line
import { dbBase } from '../../mongoConnection.js';

const { Schema } = mongoose;

const inputSchema = new Schema(
  {
    active: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    account_id: {
      type: String,
      required: true,
    },
    input_service: {
      type: String,
      required: true,
    },
    service_data: {
      type: Object,
    },
    settings: {
      type: Object,
    },
    uniq_hashes: {
      main_hash: String,
      settings_hash: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
  { collection: 'inputs' },
);

const Input = dbBase.model('Input', inputSchema);

export default Input;
