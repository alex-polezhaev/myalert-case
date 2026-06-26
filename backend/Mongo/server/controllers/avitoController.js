/* eslint-disable no-unused-expressions */
import MessengerWebhook from '../models/Avito/MessengerWebhook.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

// const handleAsyncServerError = (res) => (error) => {
//   console.error(error);
//   res.status(500).json({ error });
// };

export const messengerWebhookFindController = (req, res) => {
  try {
    MessengerWebhook.find({ ...req.body }).then((chats) => {
      chats.length !== 0 ? res.status(200).json(chats) : res.status(404).end();
    });
  } catch (error) {
    handleServerError(res, error);
  }
};

export const messengerWebhookCreateController = (req, res) => {
  try {
    new MessengerWebhook(req.body)
      .save()
      .then((chat) => res.status(200).json(chat))
      .catch((err) => res.status(400).end(err));
  } catch (error) {
    handleServerError(res, error);
  }
};

export const messengerWebhookReplaceController = async (req, res) => {
  try {
    const chat = await MessengerWebhook.findOneAndReplace(
      req.body.query,
      req.body.replace,
    );

    chat ? res.status(200).json(chat) : res.status(404).end('chat not found');
  } catch (error) {
    handleServerError(res, error);
  }
};

export const messengerWebhookUpdateController = async (req, res) => {
  try {
    const chat = await MessengerWebhook.findOneAndUpdate(
      req.body.query,
      req.body.update,
    );

    chat ? res.status(200).json(chat) : res.status(404).end('chat not found');
  } catch (error) {
    handleServerError(res, error);
  }
};
