import express from 'express';
import {
  disconnectAvitoController,
} from '../controllers/disconnectAvitoController.js';

const router = express.Router();

router.delete('/avito/disconnect_account', disconnectAvitoController);

export default router;
