/* eslint-disable no-restricted-syntax */
import crypto from 'crypto';

export const checkTelegramData = async (auth_data) => {
  try {
    const token = process.env.TG_BOT_TOKEN;
    const secret = crypto.createHash('sha256').update(token).digest();
    const array = [];

    for (const key in auth_data) {
      if (key !== 'hash') {
        array.push(`${key}=${auth_data[key]}`);
      }
    }

    const check_hash = crypto
      .createHmac('sha256', secret)
      .update(array.sort().join('\n'))
      .digest('hex');

    if (check_hash === auth_data.hash) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
