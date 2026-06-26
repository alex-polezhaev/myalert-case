import { api } from './index.js';

export const removeConnection = (data) =>
  api().post('/operation/replace_connection', { ...data, del: true });

export const createConnection = (data) =>
  api().post('/operation/replace_connection', data);

export const switchActiveConnection = (data) =>
  api().post('/operation/switch_active_connection', data);
