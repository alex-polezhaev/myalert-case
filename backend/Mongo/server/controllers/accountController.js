/* eslint-disable no-unused-expressions */
import Account from '../models/Base/Account.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

export const acconutCreateController = (req, res) => {
  try {
    new Account(req.body)
      .save()
      .then((account) => res.status(200).json(account))
      .catch((err) => res.status(400).end(err));
  } catch (error) {
    handleServerError(res, error);
  }
};

export const acconutDeleteController = (req, res) => {
  try {
    Account.findOneAndDelete(req.body)
      .then((account) => res.status(200).json(account))
      .catch((err) => res.status(400).end(err));
  } catch (error) {
    handleServerError(res, error);
  }
};

export const acconutFindController = (req, res) => {
  try {
    Account.find({ ...req.body }).then((accounts) => {
      accounts.length !== 0
        ? res.status(200).json(accounts)
        : res.status(404).end();
    });
  } catch (error) {
    handleServerError(res, error);
  }
};

export const accountUpdateController = async (req, res) => {
  try {
    const account = await Account.findOneAndUpdate(req.body.query, req.body.update);

    account
      ? res.status(200).json(account)
      : res.status(404).end('account not found');
  } catch (error) {
    handleServerError(res, error);
  }
};
