import { isDefined } from '../utils';

/**
 *
 * @param value
 * @param matchToProperty
 * @param obj
 * @returns {boolean}
 */
export default function matchToPropertyRule(value, matchToProperty, obj) {
  if (!isDefined(value)) {
    return true;
  }

  return value === obj[matchToProperty];
}
