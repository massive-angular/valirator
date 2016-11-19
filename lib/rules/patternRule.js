import { isDefined, isString } from '../utils';

/**
 *
 * @param value
 * @param pattern
 * @returns {boolean}
 */
export default function patternRule(value, pattern) {
  if (!isDefined(value)) {
    return true;
  }

  pattern = isString(pattern)
    ? new RegExp(pattern)
    : pattern;

  return pattern.test(value);
}
