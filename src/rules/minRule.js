import { registerRule } from '../core';

export function minRule(value, min) {
  return value >= min;
}

registerRule('min', minRule, 'must be greater than or equal to %{expected}');
