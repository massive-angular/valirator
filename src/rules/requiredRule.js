import { registerRule, isDefined } from '../core';

export function requiredRule(value, required) {
  if (!required) {
    return true;
  }

  return isDefined(value);
}

registerRule('required', requiredRule, 'is required');
