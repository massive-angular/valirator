import { registerRule, isDefined } from '../core';

export function uniqueItemsRule(value, uniqueItems) {
  if (!isDefined(value)) {
    return true;
  }

  if (!uniqueItems) {
    return true;
  }

  var hash = {};

  for (var i = 0, l = value.length; i < l; i++) {
    var key = JSON.stringify(value[i]);
    if (hash[key]) {
      return false;
    }

    hash[key] = true;
  }

  return true;
}

registerRule('uniqueItems', uniqueItemsRule, 'must hold a unique set of values');
