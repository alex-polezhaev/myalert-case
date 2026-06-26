import { apiAvito } from '../api/index.js';
import { getMessageMood } from './getMessageMood.js';

export const getMessagesHistory = async (account, avito_user_id, chat_id) => {
  const {
    data: { access_token },
  } = account;

  // Fetch the message history
  const messages = await apiAvito(access_token)
    .get(`messenger/v3/accounts/${avito_user_id}/chats/${chat_id}/messages/`)
    .then(({ data }) => data.messages);

  const promises = messages.map(async (msg, i) => {
    // Format messages into the mongo schema
    const new_msg = { ...msg };
    delete new_msg.isRead;

    // Attach mood to the first message
    let current_mood = null;
    if (msg.type === 'text' && i === 0) {
      current_mood = await getMessageMood(msg.content.text);
    }
    new_msg.mood = current_mood;

    return new_msg;
  });

  const formated_messages = Promise.all(promises);

  return formated_messages;
};
