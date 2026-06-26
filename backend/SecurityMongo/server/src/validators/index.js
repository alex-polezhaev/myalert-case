import { isObject } from './helpers.js';
import notifyLostMessageValidator from './strategies/notifyLostMessageValidator.js';
import notifyNegativeMoodValidator from './strategies/notifyNegativeMoodValidator.js';
import replyFirstMessageValidator from './strategies/replyFirstMessageValidator.js';
import replyLostMessageValidator from './strategies/replyLostMessageValidator.js';

const validators = {
  notify_lost_message: notifyLostMessageValidator,
  notify_negative_mood: notifyNegativeMoodValidator,
  reply_first_message: replyFirstMessageValidator,
  reply_lost_message: replyLostMessageValidator,
};

// Returns an array of errors (each error is a string)
const validateSettings = (settings) => {
  if (!settings || !isObject(settings)) {
    return ['Data is missing or has an invalid format'];
  }
  const strategies = Object.entries(settings);
  if (strategies.length === 0) {
    return ['Data is missing'];
  }
  const strategy = strategies[0];
  const [strategyKey, strategyRules] = strategy;
  const validator = validators[strategyKey];
  if (!validator) {
    return ['No such strategy exists'];
  }
  if (!isObject(strategyRules)) {
    return ['Strategy rules have an invalid format'];
  }

  const errors = validator(strategyRules);
  return errors;
};

export default validateSettings;
