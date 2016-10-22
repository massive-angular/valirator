import { registerRule, isDefined, isArray, isObject, isString, isDate, isNumber, isBoolean, isNull } from '../core';

function checkValueType(value, type) {
  switch (type) {
    case 'null':
      return isNull(value);

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

export function typeRule(value, type) {
  if (!isDefined(value)) {
    return true;
  }

  let types = type;

  if (!Array.isArray(type)) {
    types = [type];
  }

  return types.some(type => checkValueType(value, type));
}

registerRule('type', typeRule, 'must be of %{expected} type');
