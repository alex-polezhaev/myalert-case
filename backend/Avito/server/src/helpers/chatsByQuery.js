import { api } from '../../api/index.js';

export const chatsByQuery = (query) =>
  api('mongo')
    .put('avito/find_chats_by_query', query)
    .then(({ data }) => data)
    .catch((error) => {
      if (error.response.status === 404) {
        return null;
      }
    });
