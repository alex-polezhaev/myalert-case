/* eslint-disable no-unused-expressions */
import Output from '../models/Base/Output.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

export const outputFindController = (req, res) => {
  try {
    Output.find({ ...req.body }).then((outputs) => {
      outputs.length !== 0
        ? res.status(200).json(outputs)
        : res.status(404).end();
    });
  } catch (error) {
    handleServerError(res, error);
  }
};

export const outputsDeleteController = (req, res) => {
  try {
    Output.deleteMany({ ...req.body })
      .then((outputs) => res.status(200).json(outputs))
      .catch((err) => res.status(400).end(err));
  } catch (error) {
    handleServerError(res, error);
  }
};

export const outputCreateController = (req, res) => {
  try {
    new Output(req.body)
      .save()
      .then((output) => res.status(200).json(output))
      .catch((err) => res.status(400).end(err));
  } catch (error) {
    handleServerError(res, error);
  }
};
