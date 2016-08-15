import { registerRule, isDefined, isArray } from '../core';

export function maxItemsRule(value, minItems) {
  if (!isDefined(value)) {
    return true;
  }

  return isArray(value) && value.length <= minItems;
}

registerRule('maxItems', maxItemsRule, 'must contain less than %{expected} items');
