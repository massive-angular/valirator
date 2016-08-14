import { registerRule } from '../core';

export function minItemsRule(value, minItems) {
  return Array.isArray(value) && value.length >= minItems;
}

registerRule('minItems', minItemsRule, 'must contain more than %{expected} items');
