import { registerRule, isDefined } from '../core';

export function notMatchToRule(value, notMatchTo) {
  if (!isDefined(value)) {
    return true;
  }

  return value !== notMatchTo;
}

registerRule('notMatchTo', notMatchToRule, '%{actual} should not match to %{expected}');
