import axios from 'axios';
import { api } from '../api/index.js';
// import { transformChatResponse } from '../src/helpers/transformChatResponse.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

export const sendMessageController = async (req, res) => {
  const {
    avito_user_id, chat_id, message, output_id,
  } = req.body;

  const url = `https://api.avito.ru/messenger/v1/accounts/${avito_user_id}/chats/${chat_id}/messages`;
  const payload = {
    message: {
      text: message,
    },
    type: 'text',
  };

  try {
    const output = await api('mongo').put('outputs/find_by_query', {
      _id: output_id,
    }).then((resp) => resp.data[0]);

    const {
      service_data: { access_token },
    } = output;

    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    axios.post(url, payload, config).then(() => res.status(200).end());
  } catch (error) {
    handleServerError(res, error);
  }
};

export const getMessageDataController = async (req, res) => {
  try {
    // Placeholder endpoint: aggregates chat data across connected Avito
    // accounts. Implementation removed for this public showcase because it
    // required live Avito API credentials (client_id/client_secret per account).
    res.status(200).json([]);
  } catch (error) {
    handleServerError(res, error);
  }
};
