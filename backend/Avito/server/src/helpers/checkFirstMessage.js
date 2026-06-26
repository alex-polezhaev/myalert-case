import { DateTime } from 'luxon';

export const checkFirstMessage = (messages) => {
  let out_messages = false;
  let last_msg_old = false;

  // There are no replies among the messages
  messages.forEach((msg) => {
    if (msg.direction === 'out') {
      out_messages = true;
    }
  });

  // The last message is older than 3 minutes
  const last_message = messages[0];
  const { created } = last_message;

  const msg_time = DateTime.fromSeconds(created, {
    zone: 'Europe/Moscow',
  });
  const msg_deadline = msg_time.plus({ minute: 3 });

  if (msg_deadline > msg_time) {
    last_msg_old = true;
  }

  // If both conditions are met, trigger the rule
  if (!out_messages && last_msg_old) {
    return true;
  }
  return false;
};
