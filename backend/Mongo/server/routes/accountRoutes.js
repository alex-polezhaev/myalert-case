import express from 'express';
import {
  acconutCreateController,
  acconutDeleteController,
  acconutFindController,
  accountUpdateController,
} from '../controllers/accountController.js';

const router = express.Router();

router.post('/accounts/new_account', acconutCreateController);
router.post('/accounts/delete_account', acconutDeleteController);
router.put('/accounts/find_by_query', acconutFindController);
router.put('/accounts/update_by_query', accountUpdateController);

export default router;
