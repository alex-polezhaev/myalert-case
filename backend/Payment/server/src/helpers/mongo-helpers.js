import { api } from '../../api/index.js';

const apiClient = api('mongo');

export const getUserById = async (userID) => {
  const urlPath = `/users/get_one_by_id/${userID}`;
  return apiClient
    .get(urlPath)
    .then((resp) => resp.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const getOrderById = async (orderID) => {
  const urlPath = `/orders/get_one_by_id/${orderID}`;
  return apiClient
    .get(urlPath)
    .then((resp) => resp.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const createOrder = async (userID, amount) => {
  const urlPath = '/orders/create';
  return apiClient
    .post(urlPath, { userID, amount })
    .then((resp) => resp.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const updateUserById = async (userID, body) => {
  const urlPath = `/users/update_by_id/${userID}`;
  return apiClient
    .patch(urlPath, body)
    .then((resp) => resp.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const updateOrderById = async (orderID, body) => {
  const urlPath = `/orders/update_by_id/${orderID}`;
  return apiClient
    .patch(urlPath, body)
    .then((resp) => resp.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const removeRebillId = async (userID) => {
  const urlPath = `/users/remove_rebill_id/${userID}`;
  return apiClient
    .delete(urlPath)
    .then((resp) => resp.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const getAllUsers = async () => {
  const urlPath = '/users/get_all';
  return apiClient
    .get(urlPath)
    .then((resp) => resp.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
