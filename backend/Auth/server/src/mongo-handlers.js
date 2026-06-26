import { api } from '../api/index.js';

export const getUserByTelegram = async (telegram_id) => {
  const user = await api('mongo')
    .put('/users/find_by_query', {
      telegram_id,
    })
    .then((resp) => resp.data[0])
    .catch((err) => {
      if (err.response.status) {
        if (err.response.status === 404) return null;
        if (err.response.status === 400) return null;
      }
      throw err;
    });
  return user;
};

export const createUser = async (body) => {
  const user = await api('mongo')
    .post('/users/new_user', body)
    .then((resp) => resp.data)
    .catch(() => null);
  return user;
};

export const createAccount = async (body) => {
  const account = await api('mongo')
    .post('/accounts/new_account', body)
    .then((resp) => resp.data)
    .catch(() => null);
  return account;
};

// getters

export const checkAcc = async (_id, user_id) => {
  if (!_id) return true;
  return api('mongo')
    .put('accounts/find_by_query', { _id, user_id })
    .then(({ data }) => data[0].length > 0)
    .catch(() => false);
};

export const checkInput = async (_id, user_id) => {
  if (!_id) return true;
  return api('mongo')
    .put('inputs/find_by_query', { _id, user_id })
    .then(({ data }) => data[0].length > 0)
    .catch(() => false);
};

export const checkOutput = async (_id, user_id) => {
  if (!_id) return true;
  return api('mongo')
    .put('outputs/find_by_query', { _id, user_id })
    .then(({ data }) => data[0].length > 0)
    .catch(() => false);
};
