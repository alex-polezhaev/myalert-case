/* eslint-disable no-unused-expressions */
import Task from '../models/Tasks/Common.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

// const handleAsyncServerError = (res) => (error) => {
//   console.error(error);
//   res.status(500).json({ error });
// };

export const taskCreateController = (req, res) => {
  try {
    new Task(req.body)
      .save()
      .then((task) => res.status(200).json(task))
      .catch((err) => res.status(400).end(err));
  } catch (error) {
    handleServerError(res, error);
  }
};

export const taskFindController = (req, res) => {
  try {
    Task.find({ ...req.body }).then((tasks) => {
      tasks.length !== 0 ? res.status(200).json(tasks) : res.status(404).end();
    });
  } catch (error) {
    handleServerError(res, error);
  }
};

export const taskUpdateController = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      req.body.query,
      req.body.update,
    );

    task ? res.status(200).json(task) : res.status(404).end('task not found');
  } catch (error) {
    handleServerError(res, error);
  }
};
