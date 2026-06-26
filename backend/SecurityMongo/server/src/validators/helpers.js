export const isString = (el) => typeof el === 'string' || el instanceof String;

export const isObject = (el) => typeof el === 'object'
  && !Array.isArray(el)
  && el !== null;
