import { registerRule } from '../core';

export function exclusiveMinimumRule(value, exclusiveMinimum) {
  return value > exclusiveMinimum;
}

registerRule('exclusiveMinimum', exclusiveMinimumRule, 'must be greater than %{expected}');
