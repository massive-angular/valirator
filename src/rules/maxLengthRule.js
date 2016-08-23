import { registerRule, isDefined } from '../core';

export function maxLengthRule(maxLength, value) {
  if (!isDefined(value)) {
    return true;
  }

  return value.length <= maxLength;
}

registerRule('maxLength', maxLengthRule, 'is too long (maximum is %{expected} characters)');
