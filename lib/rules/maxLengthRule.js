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
