import { api } from '../api/index.js';
import { getActiveInputs } from './helpers/getActiveInputs.js';

export const conductor = async () => {
  try {
    const active_inputs = await getActiveInputs();

    if (!active_inputs) {
      return null;
    }

    const promises = [];

    active_inputs.forEach((input) => {
      const { _id: input_id, user_id } = input;
      const {
        notify_lost_message,
        reply_first_message,
        reply_lost_message,
        notify_negative_mood,
      } = input.settings;

      if (!input.active) return null;

      if (notify_lost_message) {
        promises.push(
          api('avito').post('start/notify_lost_message', {
            notify_lost_message,
            user_id,
            input_id,
          }),
        );
      }
      if (notify_negative_mood) {
        promises.push(
          api('avito').post('start/notify_negative_mood', {
            notify_negative_mood,
            user_id,
            input_id,
          }),
        );
      }
      if (reply_first_message) {
        promises.push(
          api('avito').post('start/reply_first_message', {
            reply_first_message,
            user_id,
            input_id,
          }),
        );
      }
      if (reply_lost_message) {
        promises.push(
          api('avito').post('start/reply_lost_message', {
            reply_lost_message,
            user_id,
            input_id,
          }),
        );
      }
    });

    await Promise.all(promises);
  } catch (error) {
    console.error(error);
  }

  // Poor temporary solution
  setTimeout(() => conductor(), 1000);
};
