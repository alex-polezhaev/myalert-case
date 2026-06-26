import express from 'express';
import authRoutes from './routes.js';

const router = express.Router();

const routes = [
  authRoutes,
];

routes.forEach((route) => router.use(route));

export default router;
