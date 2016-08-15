import { registerRule, isDefined } from '../core';

export function allowEmptyRule(value, allowEmpty) {
  if (!isDefined(value)) {
    return true;
  }

  return !!value || (!!allowEmpty && value === '');
}

registerRule('allowEmpty', allowEmptyRule, 'must not be empty');
