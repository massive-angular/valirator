import { registerRule, isDefined } from '../core';

export function matchToRule(value, matchTo) {
  if (!isDefined(value)) {
    return true;
  }

  return value === matchTo;
}

registerRule('matchTo', matchToRule, '%{actual} should match to %{expected}');
