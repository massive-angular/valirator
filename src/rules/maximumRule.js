import { registerRule } from '../core';

export function maximumRule(value, maximum) {
  return value <= maximum;
}

registerRule('maximum', maximumRule, 'must be less than or equal to %{expected}');
