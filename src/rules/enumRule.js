import { registerRule } from '../core';

export function enumRule(value, e) {
  return e && e.indexOf(value) !== -1;
}

registerRule('enum', enumRule, 'must be present in given enumerator');
