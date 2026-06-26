import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import 'dotenv/config';
import routes from './routes/index.js';
import { startTelegramBot } from './botConnection.js';

const { TELEGRAM_PORT, ORIGIN } = process.env;
const app = express();

const logger = morgan('tiny');
app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', ORIGIN);
  res.set('Access-Control-Allow-Methods', '*');
  res.set(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.set('Access-Control-Allow-Credentials', true);
  next();
});
// Routes must be registered at the very end
app.use(routes);

startTelegramBot();

app.listen(TELEGRAM_PORT, (err) => {
  if (!err) {
    console.log(`Listening port ${TELEGRAM_PORT}`);
  } else {
    console.error(err);
    process.exit(1);
  }
});
