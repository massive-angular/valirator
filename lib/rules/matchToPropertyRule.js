import { isDefined } from '../utils';

/**
 *
 * @param value
 * @param matchToProperty
 * @param obj
 * @returns {boolean}
 */
export default function matchToPropertyRule(value, matchToProperty, obj) {
  return value === obj[matchToProperty];
}
