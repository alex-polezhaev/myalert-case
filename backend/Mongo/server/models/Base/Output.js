import mongoose from 'mongoose';
import { dbBase } from '../../mongoConnection.js';

const { Schema } = mongoose;

const outputSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    account_id: {
      type: String,
      required: true,
    },
    input_id: {
      type: String,
      required: true,
    },
    output_service: {
      type: String,
      required: true,
    },
    service_data: {
      type: Object,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
  { collection: 'outputs' },
);

const Output = dbBase.model('Output', outputSchema);

export default Output;
