import { registerRule } from '../core';

export function allowEmptyRule(value, allowEmpty) {
  return !!value || (!!allowEmpty && value === '');
}

registerRule('allowEmpty', allowEmptyRule, 'must not be empty');
