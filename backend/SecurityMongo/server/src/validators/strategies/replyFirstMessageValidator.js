import basicStrategyValidator from './index.js';
import validateBusinessHours from '../rules/validateBusinessHours.js';
import validateInHoursMessage from '../rules/validateInHoursMessage.js';
import validateOutOfHoursMessage from '../rules/validateOutOfHoursMessage.js';
import validateUseBusinessHours from '../rules/validateUseBusinessHours.js';

const rules = {
  use_business_hours: validateUseBusinessHours,
  business_hours: validateBusinessHours,
  in_hours_message: validateInHoursMessage,
  out_of_hours_message: validateOutOfHoursMessage,
};

const replyFirstMessageValidator = (strategyRules) => {
  const errors = basicStrategyValidator(strategyRules, rules);
  return errors;
};

export default replyFirstMessageValidator;
