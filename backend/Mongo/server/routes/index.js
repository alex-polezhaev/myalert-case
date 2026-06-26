import express from 'express';
import avitoRoutes from './avitoRoutes.js';
import inputRoutes from './inputRoutes.js';
import taskRoutes from './taskRoutes.js';
import accountRoutes from './accountRoutes.js';
import outputRoutes from './outputRoutes.js';
import userRoutes from './userRoutes.js';
import orderRoutes from './orderRoutes.js';

const router = express.Router();

const routes = [
  avitoRoutes,
  inputRoutes,
  taskRoutes,
  accountRoutes,
  outputRoutes,
  userRoutes,
  orderRoutes,
];

routes.forEach((route) => router.use(route));

export default router;
