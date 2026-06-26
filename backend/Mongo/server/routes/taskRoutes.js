import express from 'express';
import {
  taskCreateController,
  taskFindController,
  taskUpdateController,
} from '../controllers/taskController.js';

const router = express.Router();

router.post('/tasks/create_task', taskCreateController);
router.put('/tasks/find_task_by_query', taskFindController);
router.put('/tasks/update_task_by_query', taskUpdateController);

export default router;
