import express from 'express';
import {
  sendMessageController,
} from '../controllers/messageController.js';

const router = express.Router();

router.post('/send_message', sendMessageController);

export default router;
