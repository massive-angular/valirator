import { registerRule } from '../core';

export function minItemsRule(value, minItems) {
  if (Array.isArray(value)) {
    return value.length >= minItems;
  }

  return true;
}

registerRule('minItems', minItemsRule, 'must contain more than %{expected} items');
