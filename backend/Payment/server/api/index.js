import axios from 'axios';

export const api = (service) => {
  const hosts = {
    mongo: process.env.MONGO_HOST,
  };

  return axios.create({
    baseURL: hosts[service],
  });
};
