import { registerRule, isDefined } from '../core';

export function minLengthRule(value, minLength) {
  if (!isDefined(value)) {
    return true;
  }

  return value.length >= minLength;
}

registerRule('minLength', minLengthRule, 'is too short (minimum is %{expected} characters)');
