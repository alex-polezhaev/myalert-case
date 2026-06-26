import { api } from '../api/index.js';

export const getMessageMood = async (message_text) =>
  api('message_mood')
    .post('/', [message_text])
    .then(({ data }) => data[0].text_mood)
    .then((text_mood) => {
      if (Object.values(text_mood)[0] > 0.5) {
        return Object.keys(text_mood)[0];
      }
      return 'force_skip';
    })
    .catch((err) => {
      console.error(err);
      return 'server_err';
    });
