import { registerRule } from '../core';

export function minLengthRule(value, minLength) {
  if (value) {
    return value.length >= minLength;
  }

  return true;
}

registerRule('minLength', minLengthRule, 'is too short (minimum is %{expected} characters)');
