import basicStrategyValidator from './index.js';
import validateBusinessHours from '../rules/validateBusinessHours.js';
import validateNotifyTimeout from '../rules/validateNotifyTimeout.js';
import validateUseBusinessHours from '../rules/validateUseBusinessHours.js';

const rules = {
  use_business_hours: validateUseBusinessHours,
  business_hours: validateBusinessHours,
  notify_timeout: validateNotifyTimeout,
};

const notifyLostMessageValidator = (strategyRules) => {
  const errors = basicStrategyValidator(strategyRules, rules);
  return errors;
};

export default notifyLostMessageValidator;
