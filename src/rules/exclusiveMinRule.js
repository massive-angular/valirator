import { registerRule, isDefined } from '../core';

export function exclusiveMinRule(value, exclusiveMin) {
  if (!isDefined(value)) {
    return true;
  }

  return value > exclusiveMin;
}

registerRule('exclusiveMin', exclusiveMinRule, 'must be greater than %{expected}');
