import { isString } from '../helpers.js';

const validateOutOfHoursMessage = (msg) => {
  if (!isString(msg)) return ['Invalid out-of-hours message format'];
  if (msg.length > 1000) return ['The out-of-hours message cannot exceed 1000 characters'];
  return [];
};

export default validateOutOfHoursMessage;
