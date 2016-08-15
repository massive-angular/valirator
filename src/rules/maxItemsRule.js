import { registerRule } from '../core';

export function maxItemsRule(value, minItems) {
  if (Array.isArray(value)) {
    return value.length <= minItems;
  }

  return true;
}

registerRule('maxItems', maxItemsRule, 'must contain less than %{expected} items');
