import TelegramBot from 'node-telegram-bot-api';
import { createAccount } from './src/createAccount.js';

export const tg_bot = new TelegramBot(process.env.TG_BOT_TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
  },
});
export const startTelegramBot = () => {
  createAccount(tg_bot);
};
