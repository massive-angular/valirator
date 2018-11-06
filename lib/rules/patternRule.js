import { castArray, isDefined, isString } from '../utils';

/**
 *
 * @param value
 * @param patterns
 * @returns {boolean}
 */
export default function patternRule(value, patterns) {
  if (!isDefined(value)) {
    return true;
  }

  patterns = castArray(patterns).map(pattern => (isString(pattern) ? new RegExp(pattern) : pattern));

  return patterns.every(pattern => pattern.test(value));
}

patternRule.ruleName = 'pattern';
patternRule.defaultMessage = 'invalid input';
