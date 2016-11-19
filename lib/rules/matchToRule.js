import { isDefined } from '../utils';
import { registerRule } from '../storage';

/**
 *
 * @param value
 * @param matchTo
 * @returns {boolean}
 */
export default function matchToRule(value, matchTo) {
  if (!isDefined(value)) {
    return true;
  }

  return value === matchTo;
}
