import { registerRule } from '../core';

export function exclusiveMinRule(value, exclusiveMin) {
  return value > exclusiveMin;
}

registerRule('exclusiveMin', exclusiveMinRule, 'must be greater than %{expected}');
