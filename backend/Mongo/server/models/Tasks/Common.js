import mongoose from 'mongoose';
import { dbTasks } from '../../mongoConnection.js';

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    is_closed: {
      type: Boolean,
      default: false,
    },
    input_id: {
      type: String,
      require: true,
    },
    from_service: {
      type: String,
      require: true,
    },
    service_data: {
      type: Object,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
  { collection: 'tasks' },
);

const Task = dbTasks.model('Task', taskSchema);

export default Task;
