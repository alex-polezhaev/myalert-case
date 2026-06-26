const basicStrategyValidator = (strategyRules, rulesValidators) => {
  const defaultErrMsg = 'Strategy rules have an invalid format';
  const rulesEntries = Object.entries(rulesValidators);
  if (Object.entries(strategyRules).length !== rulesEntries.length) {
    return [defaultErrMsg];
  }
  const errors = [];
  for (let i = 0; i < rulesEntries.length; i += 1) {
    const [rule, ruleValidator] = rulesEntries[i];
    const value = strategyRules[rule];
    if (ruleValidator) {
      const usefullData = { rules: strategyRules };
      const errorsByRule = ruleValidator(value, usefullData);
      errors.push(...errorsByRule);
    } else {
      return [defaultErrMsg];
    }
  }
  return errors;
};

export default basicStrategyValidator;
