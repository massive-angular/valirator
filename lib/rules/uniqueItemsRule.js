import { isDefined } from '../utils';

/**
 *
 * @param value
 * @param uniqueItems
 * @returns {boolean}
 */
export default function uniqueItemsRule(value, uniqueItems) {
  if (!isDefined(value)) {
    return true;
  }

  if (!uniqueItems) {
    return true;
  }

  const hash = {};

  let i = 0,
    ln = value.length;
  for (; i < ln; i++) {
    const key = JSON.stringify(value[i]);
    if (hash[key]) {
      return false;
    }

    hash[key] = true;
  }

  return true;
}
