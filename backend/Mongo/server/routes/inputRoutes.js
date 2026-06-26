import express from 'express';
import {
  inputFindController,
  inputsDeleteController,
  inputCreateController,
  inputUpdateController,
} from '../controllers/inputController.js';

const router = express.Router();

router.put('/inputs/find_by_query', inputFindController);
router.post('/inputs/delete_inputs', inputsDeleteController);
router.post('/inputs/new_input', inputCreateController);
router.put('/inputs/update_by_query', inputUpdateController);

export default router;
