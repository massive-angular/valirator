import { hasOwnProperty } from './utils';
import {
  divisibleByRule,
  enumRule,
  exclusiveMaxRule,
  exclusiveMinRule,
  formatRule,
  matchToPropertyRule,
  matchToRule,
  maxItemsRule,
  maxLengthRule,
  maxRule,
  minItemsRule,
  minLengthRule,
  minRule,
  notMatchToPropertiesRule,
  notMatchToRule,
  patternRule,
  requiredRule,
  typeRule,
  uniqueItemsRule,
} from './rules';

const rulesStorage = {};

export function registerRule(name, rule, message) {
  if (hasOwnProperty(rulesStorage, name)) {
    console.warn(`[WARNING]: Trying to override defined rule '${name}'. Please use 'overrideRule' function instead.`);
  }

  rulesStorage[name] = {
    name,
    message,
    check: rule
  };
}

export function hasRule(name) {
  return hasOwnProperty(rulesStorage, name);
}

export function getRule(name) {
  return rulesStorage[name] || {};
}

export function overrideRule(name, rule, message) {
  if (hasRule(name)) {
    let defaultRule = getRule(name);

    defaultRule.check = rule;
    defaultRule.message = message || defaultRule.message;
  }
}

export function overrideRuleMessage(name, message) {
  if (hasRule(name)) {
    let defaultRule = getRule(name);

    defaultRule.message = message;
  }
}

registerRule('divisibleBy', divisibleByRule, 'must be divisible by %{expected}');
registerRule('enum', enumRule, 'must be present in given enumerator');
registerRule('exclusiveMax', exclusiveMaxRule, 'must be less than %{expected}');
registerRule('exclusiveMin', exclusiveMinRule, 'must be greater than %{expected}');
registerRule('format', formatRule, 'is not a valid %{expected}');
registerRule('matchToProperty', matchToPropertyRule, '%{actual} should match to %{expected}');
registerRule('matchTo', matchToRule, '%{actual} should match to %{expected}');
registerRule('maxItems', maxItemsRule, 'must contain less than %{expected} items');
registerRule('maxLength', maxLengthRule, 'is too long (maximum is %{expected} characters)');
registerRule('max', maxRule, 'must be less than or equal to %{expected}');
registerRule('minItems', minItemsRule, 'must contain more than %{expected} items');
registerRule('minLength', minLengthRule, 'is too short (minimum is %{expected} characters)');
registerRule('min', minRule, 'must be greater than or equal to %{expected}');
registerRule('notMatchToProperties', notMatchToPropertiesRule, '%{actual} should not match to %{expected}');
registerRule('notMatchTo', notMatchToRule, '%{actual} should not match to %{expected}');
registerRule('pattern', patternRule, 'invalid input');
registerRule('required', requiredRule, 'is required');
registerRule('type', typeRule, 'must be of %{expected} type');
registerRule('uniqueItems', uniqueItemsRule, 'must hold a unique set of values');
