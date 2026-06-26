/* eslint-disable no-await-in-loop */
import { api } from '../../api/index.js';

export const taskManager = async (task, outputs) => {
  for (let i = 0; i < outputs.length; i += 1) {
    const { output_service } = outputs[i];

    if (output_service === 'telegram') {
      const { message } = task;
      const { chat_id } = outputs[i].service_data;

      await api('telegram')
        .post('send_message', { chat_id, message })
        .then(() =>
          api('mongo').put('tasks/update_task_by_query', {
            query: { _id: task._id },
            update: { is_closed: true },
          }));
    }

    if (output_service === 'avito') {
      const { message } = task;
      const { _id: output_id } = outputs[i];
      const { avito_user_id, chat_id } = task.service_data;

      await api('avito')
        .post('send_message', {
          avito_user_id, chat_id, message, output_id,
        })
        .then(() =>
          api('mongo').put('tasks/update_task_by_query', {
            query: { _id: task._id },
            update: { is_closed: true },
          }));
    }
  }
};
