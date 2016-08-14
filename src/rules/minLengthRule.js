import { registerRule } from '../core';

export function minLengthRule(value, minLength) {
  return value && value.length >= minLength;
}

registerRule('minLength', minLengthRule, 'is too short (minimum is %{expected} characters)');
