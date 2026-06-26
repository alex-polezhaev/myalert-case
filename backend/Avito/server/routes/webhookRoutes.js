import express from 'express';
import {
  messengerWebhookController,
} from '../controllers/webhookController.js';

const router = express.Router();

router.post('/messenger/v3/webhook/:userId', messengerWebhookController);

export default router;
