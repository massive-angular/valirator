import { registerRule } from '../core';

export function maxLengthRule(value, maxLength) {
  return value && value.length <= maxLength;
}

registerRule('maxLength', maxLengthRule, 'is too long (maximum is %{expected} characters)');
