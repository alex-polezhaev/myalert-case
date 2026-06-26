import passport from 'passport';
import { TelegramStrategy } from './TelegramStrategy.js';

export const strategiesInit = () => {
  passport.use('telegram', TelegramStrategy);
};
