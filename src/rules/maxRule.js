import { registerRule, isDefined } from '../core';

export function maxRule(max, value) {
  if (!isDefined(value)) {
    return true;
  }

  return value <= max;
}

registerRule('max', maxRule, 'must be less than or equal to %{expected}');
