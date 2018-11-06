import { isDefined, isArray } from '../utils';

/**
 *
 * @param value
 * @param minItems
 * @returns {boolean}
 */
export default function minItemsRule(value, minItems) {
  if (!isDefined(value)) {
    return true;
  }

  return isArray(value) && value.length >= minItems;
}

minItemsRule.ruleName = 'minItems';
minItemsRule.defaultMessage = 'must contain more than %{expected} items';
