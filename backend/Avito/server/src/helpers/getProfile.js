import axios from 'axios';

export const getProfile = async (token) => axios
  .get('https://api.avito.ru/core/v1/accounts/self', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(({ data }) => data);
