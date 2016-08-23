import { registerRule, isDefined } from '../core';

export function minLengthRule(minLength, value) {
  if (!isDefined(value)) {
    return true;
  }

  return value.length >= minLength;
}

registerRule('minLength', minLengthRule, 'is too short (minimum is %{expected} characters)');
