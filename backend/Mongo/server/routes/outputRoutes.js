import express from 'express';
import {
  outputFindController,
  outputsDeleteController,
  outputCreateController,
} from '../controllers/outputController.js';

const router = express.Router();

router.put('/outputs/find_by_query', outputFindController);
router.post('/outputs/delete_outputs', outputsDeleteController);
router.post('/output/new_output', outputCreateController);

export default router;
