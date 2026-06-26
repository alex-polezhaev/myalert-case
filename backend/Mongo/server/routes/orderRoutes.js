import express from 'express';
import {
  createOrderController, getOrderByIdController, updateOrderByIdController,
} from '../controllers/orderController.js';

const router = express.Router();

router.get('/orders/get_one_by_id/:orderID', getOrderByIdController);
router.post('/orders/create', createOrderController);
router.patch('/orders/update_by_id/:orderID', updateOrderByIdController);

export default router;
