/* eslint-disable no-unused-expressions */
import Input from '../models/Base/Input.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

export const inputFindController = (req, res) => {
  try {
    Input.find({ ...req.body }).then((inputs) => {
      inputs.length !== 0
        ? res.status(200).json(inputs)
        : res.status(404).end();
    });
  } catch (error) {
    handleServerError(res, error);
  }
};

export const inputsDeleteController = (req, res) => {
  try {
    Input.deleteMany({ ...req.body }).then((inputs) => res.status(200).json(inputs));
  } catch (error) {
    handleServerError(res, error);
  }
};

export const inputCreateController = (req, res) => {
  try {
    new Input(req.body)
      .save()
      .then((input) => res.status(200).json(input))
      .catch((err) => res.status(400).end(JSON.stringify(err)));
  } catch (error) {
    handleServerError(res, error);
  }
};

export const inputUpdateController = async (req, res) => {
  try {
    const input = await Input.findOneAndUpdate(req.body.query, req.body.update);

    input
      ? res.status(200).json(input)
      : res.status(404).end('input not found');
  } catch (error) {
    handleServerError(res, error);
  }
};
