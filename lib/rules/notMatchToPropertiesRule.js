import { castArray } from '../utils';

/**
 *
 * @param value
 * @param notMatchToProperties
 * @param obj
 * @returns {*}
 */
export default function notMatchToPropertiesRule(value, notMatchToProperties, obj) {
  return castArray(notMatchToProperties).every(not => obj[not] !== value);
}
