import { registerRule } from '../core';

export function maxRule(value, max) {
  return value <= max;
}

registerRule('max', maxRule, 'must be less than or equal to %{expected}');
