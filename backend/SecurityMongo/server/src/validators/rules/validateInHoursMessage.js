import { isString } from '../helpers.js';

const validateInHoursMessage = (msg) => {
  if (!isString(msg)) return ['Invalid in-hours message format'];
  if (msg.length > 1000) return ['The in-hours message cannot exceed 1000 characters'];
  return [];
};

export default validateInHoursMessage;
