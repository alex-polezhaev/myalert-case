import express from 'express';
import {
  deleteConnectionController,
  replaceConnectionController,
  getConnectionsController,
  switchActiveController,
} from '../controllers/connectionControllers.js';

const router = express.Router();

router.post('/operation/delete_connection_with_dependency', deleteConnectionController);
router.post('/operation/replace_connection', replaceConnectionController);
router.get('/operation/get_connections', getConnectionsController);
router.post('/operation/switch_active_connection', switchActiveController);

export default router;
