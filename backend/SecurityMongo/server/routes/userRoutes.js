import express from 'express';
import {
  getUserController,
} from '../controllers/userControllers.js';

const router = express.Router();

router.get(
  '/operation/get_current_user',
  getUserController,
);

export default router;
