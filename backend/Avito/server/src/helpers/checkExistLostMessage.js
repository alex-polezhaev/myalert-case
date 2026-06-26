import { DateTime } from 'luxon';

export const checkExistLostMessage = (messages, timeout) => {
  let lost_message_exist = false;
  let return_msg;
  const zone = 'Europe/Moscow';

  const now = DateTime.now().setZone(zone);

  for (let i = 0; i < messages.length; i += 1) {
    const curr_msg = messages[i];

    // Time-based check
    const curr_msg_date = DateTime.fromSeconds(curr_msg.created, { zone });
    const deadline_date = curr_msg_date.plus({
      minute: timeout,
    });
    const timeout_expired = now > deadline_date;

    // If there is a covering outbound message, check for the robot's invisible marker character (U+3164)
    // If the marker is present we skip it, because a robot reply does not count as a human answer
    if (
      curr_msg.direction === 'out'
      && curr_msg.content.text
      && !curr_msg.content.text.includes('ㅤ')
    ) {
      break;
    } else if (
      // If we found an inbound message, check whether it is overdue
      curr_msg.direction === 'in'
      && timeout_expired
      && curr_msg.content.text
    ) {
      lost_message_exist = true;
      return_msg = { ...curr_msg, index: i };
      break;
    }
  }

  return { lost_message_exist, return_msg };
};
