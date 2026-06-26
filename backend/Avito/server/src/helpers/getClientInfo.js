import axios from 'axios';
import { api } from '../../api/index.js';

export const getClientInfo = async (avito_user_id, chat_id) => {
  const account = await api('mongo')
    .put('accounts/find_by_query', {
      'data.id': avito_user_id,
    })
    .then(({ data }) => data[0]);

  const {
    data: { access_token },
  } = account;

  const chat = await axios
    .get(
      `https://api.avito.ru/messenger/v2/accounts/${avito_user_id}/chats/${chat_id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    )
    .then(({ data }) => data);

  const client = chat.users.filter((user) => user.id !== avito_user_id)[0];
  const seller = chat.users.filter((user) => user.id === avito_user_id)[0];
  const chat_url = `https://www.avito.ru/profile/messenger/channel/${chat_id}`;

  return { client, seller, chat_url };
};
