import { registerRule } from '../core';

export function exclusiveMaximumRule(value, exclusiveMaximum) {
  return value < exclusiveMaximum;
}

registerRule('exclusiveMaximum', exclusiveMaximumRule, 'must be less than %{expected}');
