import { isDefined } from '../utils';

/**
 *
 * @param value
 * @param minLength
 * @returns {boolean}
 */
export default function minLengthRule(value, minLength) {
  if (!isDefined(value)) {
    return true;
  }

  return value.length >= minLength;
}

minLengthRule.ruleName = 'minLength';
minLengthRule.defaultMessage = 'is too short (minimum is %{expected} characters)';
