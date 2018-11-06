import { isDefined, isBoolean, isObject } from '../utils';

/**
 *
 * @param value
 * @param required
 * @returns {*}
 */
export default function requiredRule(value, required) {
  if (isBoolean(required) && !required) {
    return true;
  }

  if (isObject(required)) {
    const { allowEmpty, allowZero } = required;

    if (isBoolean(allowEmpty)) {
      return allowEmpty && value === '';
    }

    if (isBoolean(allowZero)) {
      return allowZero && value === 0;
    }
  }

  return !!value && isDefined(value);
}
