import { DateTime } from 'luxon';

export const nowAndDeadline = (message, notify_timeout) => {
  const deadline = DateTime.fromSeconds(message.created, {
    zone: 'Europe/Moscow',
  }).plus({ minute: notify_timeout });
  const now = DateTime.now().setZone('Europe/Moscow');

  return {
    deadline,
    now,
  };
};
