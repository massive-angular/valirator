import { isDefined, isBoolean, isNumber, isString, isDate, isObject, isArray } from '../utils';

function checkValueType(value, type) {
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

/**
 *
 * @param value
 * @param type
 * @returns {boolean}
 */
export default function typeRule(value, type) {
  if (!isDefined(value)) {
    return true;
  }

  let types = type;

  if (!Array.isArray(type)) {
    types = [type];
  }

  return types.some(type => checkValueType(value, type));
}

typeRule.ruleName = 'type';
typeRule.defaultMessage = 'must be of %{expected} type';
