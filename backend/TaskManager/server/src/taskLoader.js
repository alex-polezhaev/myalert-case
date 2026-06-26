/* eslint-disable no-await-in-loop */
import { api } from '../../api/index.js';
import { taskManager } from './taskManager.js';

export const taskLoader = async () => {
  const tasks = await api('mongo')
    .put('tasks/find_task_by_query', { is_closed: false })
    .then(({ data }) => data)
    .catch((error) => {
      if (error.response.status === 404) {
        return null;
      }
      throw error;
    });

  if (!tasks) {
    setTimeout(() => taskLoader(), 1000);
    return null;
  }

  const outputs = await Promise.all(
    tasks.map((task) =>
      api('mongo')
        .put('outputs/find_by_query', { input_id: task.input_id })
        .then(({ data }) => data)
        .catch(() => [])),
  );

  for (let i = 0; i < tasks.length; i += 1) {
    if (outputs[i]) {
      await taskManager(tasks[i], outputs[i]);
    }
  }

  setTimeout(() => taskLoader(), 1000);
};
