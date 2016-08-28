import { registerRule, isDefined, isArray } from '../core';

export function notMatchToPropertiesRule(value, notMatchToProperties, obj) {
  if (!isDefined(value)) {
    return true;
  }

  if (!isArray(notMatchToProperties)) {
    notMatchToProperties = [notMatchToProperties];
  }

  return notMatchToProperties.every(not => obj[not] !== value);
}

registerRule('notMatchToProperties', notMatchToPropertiesRule, '%{actual} should not match to %{expected}');
