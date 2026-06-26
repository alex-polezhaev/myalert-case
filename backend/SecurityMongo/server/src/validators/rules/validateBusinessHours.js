import { isString } from '../helpers.js';

const getNumbers = (time) => {
  if (!isString(time)) return null;
  const [hours, mins] = time.split(':');
  if (!hours || !mins) return null;
  const hoursNum = +hours;
  const minsNum = +mins;
  if (Number.isNaN(hoursNum) || Number.isNaN(minsNum)) return null;
  if (hoursNum < 0 || hoursNum > 23) return null;
  if (minsNum < 0 || minsNum > 59) return null;
  return [hoursNum, minsNum];
};

const checkHours = (businessHours) => {
  const [from, to] = businessHours;
  const fromNums = getNumbers(from);
  const toNums = getNumbers(to);
  if (fromNums === null || toNums === null) return false;
  const [fromHours, fromMins] = fromNums;
  const [toHours, toMins] = toNums;
  if (fromHours > toHours) return false;
  if (fromHours === toHours && fromMins > toMins) return false;
  return true;
};

const validateBusinessHours = (businessHours, data) => {
  const { rules } = data;
  if (rules.use_business_hours === false) {
    return [];
  }
  const errMsg = 'Invalid business hours format';
  if (!Array.isArray(businessHours) || businessHours.length !== 2) {
    return [errMsg];
  }
  const isHoursValid = checkHours(businessHours);
  if (isHoursValid) {
    return [];
  }
  return [errMsg];
};

export default validateBusinessHours;
