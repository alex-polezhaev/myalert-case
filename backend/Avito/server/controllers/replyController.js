/* eslint-disable no-await-in-loop */
import { api } from '../api/index.js';
import { checkBusinessHours } from '../src/helpers/checkBusinessHours.js';
import { chatsByQuery } from '../src/helpers/chatsByQuery.js';
import { checkFirstMessage } from '../src/helpers/checkFirstMessage.js';
import { checkExistLostMessage } from '../src/helpers/checkExistLostMessage.js';

// Robot-reply marker: every automated reply is prefixed with the invisible
// Hangul Filler character U+3164 ('\u3164'). Incoming Avito messages are
// scanned for this marker so the system can tell its own auto-replies apart
// from real human answers (see checkExistLostMessage.js). The literal below
// intentionally contains that invisible character.
const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

export const replyFirstMessageController = async (req, res) => {
  const { input_id, user_id } = req.body;
  const {
    use_business_hours,
    business_hours,
    in_hours_message,
    out_of_hours_message,
  } = req.body.reply_first_message;

  try {
    const chats = await chatsByQuery({
      user_id,
      'marks.reply_first_message': false,
    });

    if (!chats) {
      res.status(204).end('No chats');
      return null;
    }

    const promises = chats.map((chat) => {
      const { chat_id } = chat;
      const { avito_id: avito_user_id } = chat.seller;

      const is_first_message = checkFirstMessage(chat.messages);
      const now_business_hours = checkBusinessHours(
        use_business_hours,
        business_hours,
      );

      if (is_first_message && now_business_hours) {
        const task = {
          from_service: 'avito-mailing',
          input_id,
          message: `ㅤ${in_hours_message}`,
          service_data: { chat_id, avito_user_id },
        };
        const promiseTask = api('mongo').post('tasks/create_task', task);
        const promiseUpdate = api('mongo').put('avito/update_chat_by_query', {
          query: { _id: chat._id },
          update: { 'marks.reply_first_message': true },
        });
        return Promise.all([promiseTask, promiseUpdate]);
      }
      if (!now_business_hours) {
        const task = {
          from_service: 'avito-mailing',
          input_id,
          message: `ㅤ${out_of_hours_message}`,
          service_data: { chat_id, avito_user_id },
        };
        const promiseTask = api('mongo').post('tasks/create_task', task);
        const promiseUpdate = api('mongo').put('avito/update_chat_by_query', {
          query: { _id: chat._id },
          update: { 'marks.reply_first_message': true },
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

export const replyLostMessageController = async (req, res) => {
  const { input_id, user_id } = req.body;
  const {
    use_business_hours,
    business_hours,
    in_hours_message,
    out_of_hours_message,
  } = req.body.reply_lost_message;
  const { reply_lost_message } = req.body;

  try {
    const chats = await api('mongo')
      .put('avito/find_chats_by_query', {
        'marks.reply_lost_message': false,
        user_id,
      })
      .then(({ data }) => data)
      .catch((error) => {
        if (error.response.status === 404) {
          return null;
        }
      });

    if (!chats) {
      res.status(204).end('No chats');
      return null;
    }

    const promises = chats.map((chat) => {
      const { chat_id } = chat;
      const { avito_id: avito_user_id } = chat.seller;

      const is_lost_msg_exist = checkExistLostMessage(
        chat.messages,
        reply_lost_message.notify_timeout,
      );
      const now_business_hours = checkBusinessHours(
        use_business_hours,
        business_hours,
      );

      if (is_lost_msg_exist && now_business_hours) {
        const task = {
          from_service: 'avito-mailing',
          input_id,
          message: `ㅤ${in_hours_message}`,
          service_data: { chat_id, avito_user_id },
        };
        const promiseTask = api('mongo').post('tasks/create_task', task);
        const promiseUpdate = api('mongo').put('avito/update_chat_by_query', {
          query: { _id: chat._id },
          update: { 'marks.reply_lost_message': true },
        });

        return Promise.all([promiseTask, promiseUpdate]);
      }

      if (is_lost_msg_exist && !now_business_hours) {
        const task = {
          from_service: 'avito-mailing',
          input_id,
          message: `ㅤ${out_of_hours_message}`,
          service_data: { chat_id, avito_user_id },
        };
        const promiseTask = api('mongo').post('tasks/create_task', task);
        const promiseUpdate = api('mongo').put('avito/update_chat_by_query', {
          query: { _id: chat._id },
          update: { 'marks.reply_lost_message': true },
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
