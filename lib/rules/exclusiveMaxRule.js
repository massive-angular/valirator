import { isDefined } from '../utils';

/**
 *
 * @param value
 * @param exclusiveMax
 * @returns {boolean}
 */
export default function exclusiveMaxRule(value, exclusiveMax) {
  if (!isDefined(value)) {
    return true;
  }

  return value < exclusiveMax;
}
