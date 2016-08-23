import { registerRule, isDefined } from '../core';

export function exclusiveMinRule(exclusiveMin, value) {
  if (!isDefined(value)) {
    return true;
  }

  return value > exclusiveMin;
}

registerRule('exclusiveMin', exclusiveMinRule, 'must be greater than %{expected}');
