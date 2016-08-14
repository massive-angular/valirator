import { registerRule, isString } from '../core';

export function patternRule(value, pattern) {
  pattern = isString(value)
    ? new RegExp(pattern)
    : pattern;

  return pattern.test(value);
}

registerRule('pattern', patternRule, 'invalid input');
