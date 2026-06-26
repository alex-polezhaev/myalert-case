import express from 'express';
import exampleRoutes from './messageRoutes.js';

const router = express.Router();

const routes = [
  exampleRoutes,
];

routes.forEach((route) => router.use(route));

export default router;
