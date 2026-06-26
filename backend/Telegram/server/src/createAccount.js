import { api } from '../api/index.js';

export const createAccount = (tg_bot) =>
  tg_bot.on('text', async (message) => {
    // Create account using /start
    if (message.text.includes('/start ')) {
      const [, code] = message.text.split(' ');
      const { from: data } = message;

      const user = await api('mongo')
        .put('users/find_by_query', { telegram_code: code })
        .then((resp) => resp.data[0])
        .catch(() => {
          tg_bot.sendMessage(
            message.chat.id,
            'Authorization token not found',
          );
          return null;
        });

      const exist = await api('mongo')
        .put('accounts/find_by_query', { 'data.username': data.username })
        .then(() => true)
        .catch(({ response }) => response.status !== 404);

      if (exist) {
        tg_bot.sendMessage(message.chat.id, 'This profile already connected');
        return null;
      }

      if (user) {
        data.chat_id = data.id;
        await api('mongo').post('accounts/new_account', {
          service: 'telegram',
          user_id: user._id,
          could_be_input: false,
          could_be_output: true,
          title: `Telegram - ${data.username}`,
          data,
        });
        tg_bot.sendMessage(message.chat.id, 'Connected successfully');
      }
    }
  });
