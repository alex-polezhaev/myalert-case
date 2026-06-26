import passportCustom from 'passport-custom';
import { getUserByTelegram, createUser, createAccount } from '../src/mongo-handlers.js';
import { checkTelegramData } from '../src/checkTelegramData.js';
import sendTelegramMsg from '../src/sendTelegramMsg.js';

const { Strategy } = passportCustom;

export const TelegramStrategy = new Strategy(async (req, done) => {
  try {
    const { auth_data } = req.body;

    if (!await checkTelegramData(auth_data)) {
      done('Bad auth data');
    }

    const { id: telegram_id } = auth_data;
    const user = await getUserByTelegram(telegram_id);

    const tgMsgBody = {
      chat_id: auth_data.id,
    };

    if (!user) {
      const userBody = { telegram_id };
      await createUser(userBody)
        .then(async (newUser) => {
          const accBody = {
            service: 'telegram',
            could_be_input: false,
            could_be_output: true,
            title: `Telegram - ${auth_data.username}`,
            user_id: newUser._id,
            data: { ...auth_data, chat_id: auth_data.id },
          };
          await createAccount(accBody);
          const message = 'Telegram account connected successfully 🎉\nTo configure notifications, follow the link https://my-alert.example/connectors';
          await sendTelegramMsg({ ...tgMsgBody, message });
          done(null, newUser);
        })
        .catch((err) => done(err));
      return;
    }

    const message = 'You have successfully signed in to your My Alert account';
    sendTelegramMsg({ ...tgMsgBody, message });
    done(null, user);
  } catch (err) {
    done(err);
  }
});
