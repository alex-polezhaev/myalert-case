const validateUseBusinessHours = (bool) => {
  if (bool === true || bool === false) return [];
  return ['Invalid format for the rule "Send notifications only during business hours"'];
};

export default validateUseBusinessHours;
