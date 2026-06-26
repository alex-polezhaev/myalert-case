import { tg_bot } from '../botConnection.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

// const handleAsyncServerError = (res) => (error) => {
//   console.error(error);
//   res.status(500).json({ error });
// };

export const sendMessageController = (req, res) => {
  const { chat_id, message } = req.body;

  try {
    tg_bot.sendMessage(chat_id, message).then(() => res.status(200).end());
  } catch (error) {
    handleServerError(res, error);
  }
};
