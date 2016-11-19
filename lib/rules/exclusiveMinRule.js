import { isDefined } from '../utils';

/**
 *
 * @param value
 * @param exclusiveMin
 * @returns {boolean}
 */
export default function exclusiveMinRule(value, exclusiveMin) {
  if (!isDefined(value)) {
    return true;
  }

  return value > exclusiveMin;
}
