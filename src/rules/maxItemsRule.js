import { registerRule } from '../core';

export function maxItemsRule(value, minItems) {
  return Array.isArray(value) && value.length <= minItems;
}

registerRule('maxItems', maxItemsRule, 'must contain less than %{expected} items');
