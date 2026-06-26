import { api } from '../api/index.js';
import { getMessagesHistory } from '../src/getMessagesHistory.js';
import { formatWebHMessage } from '../src/helpers/formatWebHMessage.js';
import { getClientInfo } from '../src/helpers/getClientInfo.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

export const messengerWebhookController = async (req, res) => {
  const message = { ...req.body };
  const { userId: urlUserId } = req.params;
  const { chat_id, user_id: avito_user_id } = req.body.payload.value;

  try {
    // Look up records with this chat id
    const chat = await api('mongo')
      .put('avito/find_chats_by_query', { chat_id, user_id: urlUserId })
      .then(({ data }) => data[0])
      .catch((error) => {
        if (error.response.status === 404) {
          return null;
        }
      });

    /** IF THE CHAT DOES NOT EXIST */
    // Fetch all messages from Avito
    // Create a new chat if it does not exist in the database
    if (!chat) {
      // Look up the account with this id
      const account = await api('mongo')
        .put('accounts/find_by_query', {
          'data.id': avito_user_id,
          user_id: urlUserId,
        })
        .then(({ data }) => data[0])
        .catch((error) => {
          if (error.response.status === 404) {
            return null;
          }
        });

      // If the account is not found (should not happen)
      if (!account) {
        res.status(500).end();
        console.error('Cant find account for received webhook');
        return null;
      }

      // Take the required data from the account and create a new chat
      const { user_id } = account;
      const { client, seller, chat_url } = await getClientInfo(
        avito_user_id,
        chat_id
      );

      const new_chat = {
        user_id,
        chat_id,
        chat_url,
        seller: { avito_id: seller.id, name: seller.name },
        client: { avito_id: client.id, name: client.name },
        messages: await getMessagesHistory(account, avito_user_id, chat_id),
      };

      // Insert the new chat into mongo
      await api('mongo').post('avito/create_chat', new_chat);

      res.status(200).end();
      return null;
    }

    /** IF THE CHAT EXISTS */
    // Add the new message to the chat
    if (chat) {
      const updated_chat = { ...chat };

      // Push into the messages array
      const form_msg = await formatWebHMessage(message);
      updated_chat.messages.unshift(form_msg);

      api('mongo').put('avito/replace_chat_by_query', {
        query: { _id: chat._id },
        replace: updated_chat,
      });
    }

    res.status(200).end();
  } catch (error) {
    handleServerError(res, error);
  }
};
