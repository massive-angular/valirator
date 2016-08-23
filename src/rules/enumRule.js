import { registerRule, isDefined, isArray } from '../core';

export function enumRule(e, value) {
  if (!isDefined(value)) {
    return true;
  }

  return isArray(e) && e.indexOf(value) !== -1;
}

registerRule('enum', enumRule, 'must be present in given enumerator');
