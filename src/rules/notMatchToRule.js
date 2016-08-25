import { registerRule, isDefined, isArray } from '../core';

export function notMatchToRule(value, notMatchTo) {
  if (!isDefined(value)) {
    return true;
  }

  if (!isArray(notMatchTo)) {
    notMatchTo = [notMatchTo];
  }

  return notMatchTo.every(not => not !== value);
}

registerRule('notMatchTo', notMatchToRule, '%{actual} should not match to %{expected}');
