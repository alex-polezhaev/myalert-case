const validateNotifyTimeout = (mins) => {
  const errMsg = 'Invalid format for the rule "A message is considered missed after (in minutes)" - the value must be between 1 and 300';
  if (!mins) return [errMsg];
  if (!+mins) return [errMsg];
  if (mins <= 0 || mins >= 301) return [errMsg];

  return [];
};

export default validateNotifyTimeout;
