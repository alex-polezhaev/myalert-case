import express from 'express';
import acconutRoutes from './accountRoutes.js';
import connectionRoutes from './connectionRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

const routes = [
  acconutRoutes,
  connectionRoutes,
  userRoutes,
];

routes.forEach((route) => router.use(route));

export default router;
