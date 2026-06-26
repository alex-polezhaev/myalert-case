import express from 'express';
import exampleRoutes from './example-routes.js';

const router = express.Router();

const routes = [
  exampleRoutes,
];

routes.forEach((route) => router.use(route));

export default router;
