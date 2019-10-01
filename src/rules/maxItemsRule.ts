import { isDefined, isArray } from '../utils';

/**
 *
 * @param value
 * @param maxItems
 * @returns {boolean}
 */
export default function maxItemsRule(value, maxItems) {
  if (!isDefined(value)) {
    return true;
  }

  return isArray(value) && value.length <= maxItems;
}

maxItemsRule.ruleName = 'maxItems';
maxItemsRule.defaultMessage = 'must contain less than %{expected} items';
