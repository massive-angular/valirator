import { isDefined, isArray } from '../utils';

/**
 *
 * @param value
 * @param notMatchTo
 * @returns {*}
 */
export default function notMatchToRule(value, notMatchTo) {
  if (!isDefined(value)) {
    return true;
  }

  if (!isArray(notMatchTo)) {
    notMatchTo = [notMatchTo];
  }

  return notMatchTo.every(not => not !== value);
}
