import { registerRule } from '../core';

export function requiredRule(value, required) {
  return !!value || !required;
}

registerRule('required', requiredRule, 'is required');
