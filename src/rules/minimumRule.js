import { registerRule } from '../core';

export function minimumRule(value, minimum) {
  return value >= minimum;
}

registerRule('minimum', minimumRule, 'must be greater than or equal to %{expected}');
