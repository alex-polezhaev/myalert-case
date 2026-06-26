import express from 'express';
import {
  messengerWebhookFindController,
  messengerWebhookCreateController,
  messengerWebhookReplaceController,
  messengerWebhookUpdateController,
} from '../controllers/avitoController.js';

const router = express.Router();

router.put('/avito/find_chats_by_query', messengerWebhookFindController);
router.post('/avito/create_chat', messengerWebhookCreateController);
router.put('/avito/replace_chat_by_query', messengerWebhookReplaceController);
router.put('/avito/update_chat_by_query', messengerWebhookUpdateController);

export default router;
