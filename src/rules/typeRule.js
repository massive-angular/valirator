import { registerRule, isArray, isObject, isString, isDate, isNumber, isBoolean } from '../core';

export function typeRule(value, type) {
  switch (type) {
    case 'boolean':
      return isBoolean(value);

    case 'number':
      return isNumber(value);

    case 'string':
      return isString(value);

    case 'date':
      return isDate(value);

    case 'object':
      return isObject(value);

    case 'array':
      return isArray(value);

    default:
      return true;
  }
}

registerRule('type', typeRule, 'must be of %{expected} type');
