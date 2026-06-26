import express from 'express';
import {
  exampleController,
} from '../controllers/example-controllers.js';

const router = express.Router();

router.get('/', exampleController);

export default router;
