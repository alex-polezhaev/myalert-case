/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
import { api } from '../api/index.js';
import { checkBusinessHours } from '../src/helpers/checkBusinessHours.js';
import { chatsByQuery } from '../src/helpers/chatsByQuery.js';
import { checkExistLostMessage } from '../src/helpers/checkExistLostMessage.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

export const notifyLostMessageController = async (req, res) => {
  const { input_id, user_id } = req.body;
  const { use_business_hours, business_hours, notify_timeout } = req.body.notify_lost_message;

  try {
    const chats = await chatsByQuery({ user_id });

    if (!chats) {
      res.status(204).end('No chats');
      return null;
    }

    const promises = chats.map((chat) => {
      const { seller, client, chat_url } = chat;
      const last_message = chat.messages[0];
      const {
        content: { text },
      } = last_message;

      const { lost_message_exist: is_lost_msg_exist, return_msg } = checkExistLostMessage(chat.messages, notify_timeout);
      const is_business_hours = checkBusinessHours(
        use_business_hours,
        business_hours,
      );

      if (
        is_lost_msg_exist
        && is_business_hours
        // Check the mark to ensure the message has not been handled yet
        && !return_msg.marks.notify_lost_message
      ) {
        const task = {
          from_service: 'avito',
          input_id,
          message: `Missed message on Avito\nAccount: – ${seller.name}\nClient: – ${client.name}\nMessage: – ${text}\nLink: – ${chat_url}`,
        };

        const promiseTask = api('mongo').post('tasks/create_task', task);

        const promiseUpdate = api('mongo').put('avito/update_chat_by_query', {
          query: { _id: chat._id },
          update: { [`messages.${return_msg.index}.marks.notify_lost_message`]: true },
        });

        return Promise.all([promiseTask, promiseUpdate]);
      }
      return null;
    });

    await Promise.all(promises);

    res.status(200).end();
  } catch (error) {
    handleServerError(res, error);
  }
};

export const notifyNegativeMoodController = async (req, res) => {
  const { input_id, user_id } = req.body;
  const { use_business_hours, business_hours } = req.body.notify_negative_mood;

  try {
    const chats = await chatsByQuery({ user_id });

    if (!chats) {
      res.status(204).end('No chats');
      return null;
    }

    const promises = chats.map((chat) => {
      const { seller, client, chat_url } = chat;
      const last_message = chat.messages[0];
      const {
        content: { text },
      } = last_message;

      const is_business_hours = checkBusinessHours(
        use_business_hours,
        business_hours,
      );

      if (
        is_business_hours
        && last_message.mood === 'negative'
        && !last_message.marks.notify_negative_mood
      ) {
        const task = {
          from_service: 'avito',
          input_id,
          message: `Negative message on Avito\nAccount: – ${seller.name}\nClient: – ${client.name}\nMessage: – ${text}\nLink: – ${chat_url}`,
        };

        const promiseTask = api('mongo').post('tasks/create_task', task);

        const promiseUpdate = api('mongo').put('avito/update_chat_by_query', {
          query: { _id: chat._id },
          update: { 'messages.0.marks.notify_negative_mood': true },
        });

        return Promise.all([promiseTask, promiseUpdate]);
      }
      return null;
    });

    await Promise.all(promises);

    res.status(200).end();
  } catch (error) {
    handleServerError(res, error);
  }
};
