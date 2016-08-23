import { registerRule, isDefined, isString } from '../core';

export function patternRule(pattern, value) {
  if (!isDefined(value)) {
    return true;
  }

  pattern = isString(pattern)
    ? new RegExp(pattern)
    : pattern;

  return pattern.test(value);
}

registerRule('pattern', patternRule, 'invalid input');
