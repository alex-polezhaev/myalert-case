import express from 'express';
import passport from 'passport';
import { checkAuth } from '../middlewares/checkAuth.js';

const router = express.Router();

router.post(
  '/login/telegram',
  passport.authenticate('telegram'),
  (req, res) => {
    res.status(200).end('Successful authentication');
  },
);

router.all('/check', checkAuth, (req, res) => {
  res.set('user_id', req.user._id);
  /** You cant set response body here, it cause crash nginx  */
  res.status(200).end(); // Be careful
});

export default router;
