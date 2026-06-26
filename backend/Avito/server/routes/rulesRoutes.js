import express from 'express';
import { notifyLostMessageController, notifyNegativeMoodController } from '../controllers/notifyController.js';
import {
  replyFirstMessageController,
  replyLostMessageController,
} from '../controllers/replyController.js';

const router = express.Router();

router.post('/start/notify_lost_message', notifyLostMessageController);
router.post('/start/reply_first_message', replyFirstMessageController);
router.post('/start/reply_lost_message', replyLostMessageController);
router.post('/start/notify_negative_mood', notifyNegativeMoodController);

export default router;
