import { registerRule, isDefined, isArray, isObject, isString, isDate, isNumber, isBoolean } from '../core';

function checkValueType(type, value) {
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

export function typeRule(type, value) {
  if (!isDefined(value)) {
    return true;
  }

  let types = type;

  if (!Array.isArray(type)) {
    types = [type];
  }

  return types.some(type => checkValueType(type, value));
}

registerRule('type', typeRule, 'must be of %{expected} type');
