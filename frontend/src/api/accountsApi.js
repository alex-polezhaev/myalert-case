import { api } from './index.js';

export const removeAcc = (accountId) =>
  api().post('/operation/delete_account', { accountId });

export const connectAvitoAcc = (data) =>
  api().post('/avito/connect_account', data);
