import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import 'dotenv/config';
import routes from './routes/index.js';
import passportInit from './passport/index.js';

const {
  AUTH_PORT, ORIGIN, MONGO_URL_AUTH, COOKIE_DOMAIN,
} = process.env;
const app = express();
const logger = morgan('tiny');

app.use(
  session({
    name: 'authentication',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGO_URL_AUTH,
    }),
    proxy: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: false,
      domain: COOKIE_DOMAIN,
    },
  }),
);

passportInit(app);

app.use(cookieParser());

app.use(logger);
app.use(express.json());
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', ORIGIN);
  res.set('Access-Control-Allow-Methods', '*');
  res.set(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.set('Access-Control-Allow-Credentials', true);
  res.set('X-Preflight-Response', true);
  next();
});

// Routes must be registered at the very end
app.use(routes);

app.listen(AUTH_PORT, (err) => {
  if (!err) {
    console.log(`Listening port ${AUTH_PORT}`);
  } else {
    console.error(err);
    process.exit(1);
  }
});
