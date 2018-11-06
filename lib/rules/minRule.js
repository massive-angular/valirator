import { isDefined } from '../utils';

/**
 *
 * @param value
 * @param min
 * @returns {boolean}
 */
export default function minRule(value, min) {
  if (!isDefined(value)) {
    return true;
  }

  return value >= min;
}

minRule.ruleName = 'min';
minRule.defaultMessage = 'must be greater than or equal to %{expected}';
