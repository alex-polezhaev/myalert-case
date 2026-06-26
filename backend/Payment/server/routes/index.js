import express from 'express';
import paymentRoutes from './routes.js';

const router = express.Router();

const routes = [
  paymentRoutes,
];

routes.forEach((route) => router.use(route));

export default router;
