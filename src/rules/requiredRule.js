import { registerRule, isDefined, isBoolean, isObject } from '../core';

export function requiredRule(required, value) {
  if (value) {
    return true;
  }

  if (isBoolean(required)) {
    return !required;
  }

  if (isObject(required)) {
    const {
      allowEmpty,
      allowZero
    } = required;

    if (isBoolean(allowEmpty)) {
      return allowEmpty && value === '';
    }

    if (isBoolean(allowZero)) {
      return allowZero && value === 0;
    }
  }

  return isDefined(value);
}

registerRule('required', requiredRule, 'is required');
