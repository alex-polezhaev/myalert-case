import express from 'express';
import webhookRoutes from './webhookRoutes.js';
import connectRoutes from './connectRoutes.js';
import rulesRoutes from './rulesRoutes.js';
import messageRoutes from './messageRoutes.js';
import disconnectRoutes from './disconnectRoutes.js';

const router = express.Router();

const routes = [webhookRoutes, connectRoutes, rulesRoutes, messageRoutes, disconnectRoutes];

routes.forEach((route) => router.use(route));

export default router;
