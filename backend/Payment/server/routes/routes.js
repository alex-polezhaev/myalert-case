import express from 'express';
import {
  paymentInitController,
  notificationController,
  subscriptionCancellationController,
} from '../controllers/controllers.js';

const router = express.Router();

router.get('/payment/init', paymentInitController);
router.post('/notify', notificationController);
router.post('/payment/cancel', subscriptionCancellationController);

export default router;
