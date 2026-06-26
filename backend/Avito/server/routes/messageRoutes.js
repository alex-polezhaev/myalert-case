import express from 'express';
import {
  sendMessageController,
  getMessageDataController,
} from '../controllers/messageController.js';

const router = express.Router();

router.post('/send_message', sendMessageController);
router.get('/get_message_data', getMessageDataController);

export default router;
