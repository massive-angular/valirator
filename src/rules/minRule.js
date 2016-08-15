import { registerRule, isDefined } from '../core';

export function minRule(value, min) {
  if (!isDefined(value)) {
    return true;
  }

  return value >= min;
}

registerRule('min', minRule, 'must be greater than or equal to %{expected}');
