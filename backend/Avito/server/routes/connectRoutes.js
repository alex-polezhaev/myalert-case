import express from 'express';
import {
  connectAvitoController,
  catchCodeAvitoController,
} from '../controllers/connectAvitoController.js';

const router = express.Router();

router.post('/avito/connect_account', connectAvitoController);
router.get('/catch_code', catchCodeAvitoController);

export default router;
