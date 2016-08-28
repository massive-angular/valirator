import { registerRule, isDefined } from '../core';

export function matchToPropertyRule(value, matchToProperty, obj) {
  if (!isDefined(value)) {
    return true;
  }

  return value === obj[matchToProperty];
}

registerRule('matchToProperty', matchToPropertyRule, '%{actual} should match to %{expected}');
