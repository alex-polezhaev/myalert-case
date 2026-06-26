import express from 'express';
import {
  deleteAccountController,
  getAccountsForInputOutputController,
  getAccountsController,
} from '../controllers/accountControllers.js';

const router = express.Router();

router.post('/operation/delete_account', deleteAccountController);
router.get(
  '/operation/get_accs_input_output',
  getAccountsForInputOutputController,
);
router.get(
  '/operation/get_accounts',
  getAccountsController,
);

export default router;
