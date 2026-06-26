import { getMessageMood } from '../getMessageMood.js';

export const formatWebHMessage = async (message) => {
  const {
    author_id, created, content, type, user_id, id,
  } = message.payload.value;

  const new_msg = {};
  new_msg.msg_id = id;
  new_msg.author_id = author_id;
  new_msg.created = created;
  new_msg.content = content;
  new_msg.type = type;
  new_msg.direction = user_id === author_id ? 'out' : 'in';

  if (type === 'text') {
    new_msg.mood = await getMessageMood(content.text);
  }

  return new_msg;
};
