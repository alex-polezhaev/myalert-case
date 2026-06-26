import passport from 'passport';
import { strategiesInit } from '../strategies/index.js';

const passportInit = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  strategiesInit();

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser(async (user, done) => {
    done(null, user);
  });
};

export default passportInit;
