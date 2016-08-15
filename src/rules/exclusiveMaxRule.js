import { registerRule } from '../core';

export function exclusiveMaxRule(value, exclusiveMax) {
  return value < exclusiveMax;
}

registerRule('exclusiveMax', exclusiveMaxRule, 'must be less than %{expected}');
