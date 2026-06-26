import express from 'express';
import {
  getUserByIdController,
  removeRebillIdController,
  updateUserByIdController,
  userFindController,
  userCreateController,
  getAllUsersController,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/users/get_all', getAllUsersController);
router.put('/users/find_by_query', userFindController);
router.get('/users/get_one_by_id/:userID', getUserByIdController);
router.patch('/users/update_by_id/:userID', updateUserByIdController);
router.post('/users/new_user', userCreateController);
router.delete('/users/remove_rebill_id/:userID', removeRebillIdController);

export default router;
