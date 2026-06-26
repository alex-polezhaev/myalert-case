/* eslint-disable no-unused-expressions */
import mongoose from 'mongoose'; /* eslint-disable-line import/no-unresolved */
import User from '../models/Base/User.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

export const getAllUsersController = (req, res) => {
  try {
    User
      .find()
      .then((users) => res.status(200).json(users))
      .catch(() => res.status(500).end());
  } catch (error) {
    handleServerError(res, error);
  }
};

export const userFindController = (req, res) => {
  try {
    User.find({ ...req.body }).then((users) => {
      users.length !== 0
        ? res.status(200).json(users)
        : res.status(404).end();
    });
  } catch (error) {
    handleServerError(res, error);
  }
};

export const getUserByIdController = (req, res) => {
  try {
    const { userID } = req.params;
    if (!userID) {
      res.status(400).end('Empty userID');
      return;
    }
    User.findById(userID).then((user) => {
      user
        ? res.status(200).json(user)
        : res.status(404).end('User is not found');
    });
  } catch (error) {
    handleServerError(res, error);
  }
};

export const updateUserByIdController = async (req, res) => {
  const payload = req.body;
  const { userID } = req.params;

  // Reject if the payload is empty
  if (Object.keys(payload).length === 0 || !payload) {
    return res.status(400).end('empty body payload');
  }

  // Reject if the id does not look like a mongo id
  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(400).end('invalid mongo id');
  }

  try {
    const user = await User.findByIdAndUpdate(userID, payload, {
      new: true,
    });
    user ? res.status(200).json(user) : res.status(404).end('user not found');
  } catch (error) {
    handleServerError(res, error);
  }
};

export const userCreateController = (req, res) => {
  try {
    new User(req.body)
      .save()
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(400).end(err));
  } catch (error) {
    handleServerError(res, error);
  }
};

export const removeRebillIdController = async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await User.findOne({ _id: userID });
    user.rebill_id = undefined;
    user.save();
    res.status(200).json(user);
  } catch (error) {
    handleServerError(res, error);
  }
};
