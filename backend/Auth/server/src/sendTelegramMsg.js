import { api } from '../api/index.js';

const sendTelegramMsg = async (body) => api('telegram')
  .post('/send_message', body);

export default sendTelegramMsg;
