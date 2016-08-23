import { registerRule, isDefined, isArray } from '../core';

export function minItemsRule(minItems, value) {
  if (!isDefined(value)) {
    return true;
  }

  return isArray(value) && value.length >= minItems;
}

registerRule('minItems', minItemsRule, 'must contain more than %{expected} items');
