import { DateTime } from 'luxon';

export const checkReplyLostMessage = (messages, reply_lost_message) => {
  const { in_hours_message, out_of_hours_message, notify_timeout } = reply_lost_message;

  let same_message_exist = false;
  let last_message_in = false;
  let timeout_exceed = false;

  // No messages with this text earlier today
  messages.forEach((msg) => {
    const msg_time = DateTime.fromSeconds(msg.created, {
      zone: 'Europe/Moscow',
    });
    const today_morning = DateTime.now().setZone('Europe/Moscow').set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    if (
      msg.type === 'text'
      && msg_time > today_morning
      && (msg.content.text === in_hours_message
        || msg.content.text === out_of_hours_message)
    ) {
      same_message_exist = true;
    }
  });

  // Last message from the client
  const last_message = messages[0];
  if (last_message.direction === 'in') {
    last_message_in = true;
  }

  // Make sure the message is overdue
  const last_message_time = DateTime.fromSeconds(last_message.created, {
    zone: 'Europe/Moscow',
  });
  const last_message_deadline = last_message_time.plus({
    minute: notify_timeout,
  });
  const now = DateTime.now().setZone('Europe/Moscow');

  if (now > last_message_deadline) {
    timeout_exceed = true;
  }

  // Verify that all rules have been satisfied
  if ((same_message_exist, last_message_in, timeout_exceed)) {
    return true;
  }
  return false;
};
