import { castArray } from '../utils';

/**
 *
 * @param value
 * @param notMatchTo
 * @returns {*}
 */
export default function notMatchToRule(value, notMatchTo) {
  return castArray(notMatchTo).every(not => not !== value);
}
