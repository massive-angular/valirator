import { isDefined } from '../utils';

/**
 *
 * @param value
 * @param max
 * @returns {boolean}
 */
export default function maxRule(value, max) {
  if (!isDefined(value)) {
    return true;
  }

  return value <= max;
}

maxRule.ruleName = 'max';
maxRule.defaultMessage = 'must be less than or equal to %{expected}';
