import { registerRule } from '../core';

export function maxLengthRule(value, maxLength) {
  if (value) {
    return value.length <= maxLength;
  }

  return true;
}

registerRule('maxLength', maxLengthRule, 'is too long (maximum is %{expected} characters)');
