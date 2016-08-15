import { registerRule, isDefined } from '../core';

export function exclusiveMaxRule(value, exclusiveMax) {
  if (!isDefined(value)) {
    return true;
  }

  return value < exclusiveMax;
}

registerRule('exclusiveMax', exclusiveMaxRule, 'must be less than %{expected}');
