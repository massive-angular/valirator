import { isDefined } from '../utils';

/**
 *
 * @param value
 * @param maxLength
 * @returns {boolean}
 */
export default function maxLengthRule(value, maxLength) {
  if (!isDefined(value)) {
    return true;
  }

  return value.length <= maxLength;
}

maxLengthRule.ruleName = 'maxLength';
maxLengthRule.defaultMessage = 'is too long (maximum is %{expected} characters)';
