import { hasOwnProperty } from './utils';
import {
  divisibleByRule,
  enumRule,
  formatRule,
  lessThanPropertyRule,
  lessThanRule,
  moreThanPropertyRule,
  moreThanRule,
  matchToPropertyRule,
  matchToRule,
  notMatchToPropertiesRule,
  notMatchToRule,
  maxItemsRule,
  maxLengthRule,
  maxRule,
  minItemsRule,
  minLengthRule,
  minRule,
  patternRule,
  requiredRule,
  typeRule,
  uniqueItemsRule,
} from './rules';

const rulesStorage = {};

/**
 * Register validation rule
 *
 * @param {string} name - rule name
 * @param {Function} rule - rule function
 * @param {string|Function} message - rule message
 */
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

/**
 * Check if rule is registered
 *
 * @param {string} name - rule name
 * @returns {boolean}
 */
export function hasRule(name) {
  return hasOwnProperty(rulesStorage, name);
}

/**
 * Get rule by name
 *
 * @param {string} name
 * @returns {{name, message, check}}
 */
export function getRule(name) {
  return rulesStorage[name] || {};
}

/**
 * Override rule by name
 *
 * @param {string} name - rule name
 * @param {Function} rule - rule function
 * @param {string|Function} message - rule message
 */
export function overrideRule(name, rule, message) {
  if (hasRule(name)) {
    let defaultRule = getRule(name);

    defaultRule.check = rule;
    defaultRule.message = message || defaultRule.message;
  }
}

/**
 * Override rule message by name
 *
 * @param {string} name - rule name
 * @param {string|Function} message - rule message
 */
export function overrideRuleMessage(name, message) {
  if (hasRule(name)) {
    let defaultRule = getRule(name);

    defaultRule.message = message;
  }
}

registerRule('divisibleBy', divisibleByRule, 'must be divisible by %{expected}');
registerRule('enum', enumRule, 'must be present in given enumerator');
registerRule('format', formatRule, 'is not a valid %{expected}');
registerRule('lessThanProperty', lessThanPropertyRule, 'must be less than %{expected}');
registerRule('lessThanRule', lessThanRule, 'must be less than %{expected}');
registerRule('moreThanProperty', moreThanPropertyRule, 'must be greater than %{expected}');
registerRule('moreThan', moreThanRule, 'must be greater than %{expected}');
registerRule('matchToProperty', matchToPropertyRule, 'should match to %{expected}');
registerRule('matchTo', matchToRule, 'should match to %{expected}');
registerRule('notMatchToProperty', notMatchToPropertiesRule, 'should not match to %{expected}');
registerRule('notMatchToProperties', notMatchToPropertiesRule, 'should not match to %{expected}');
registerRule('notMatchTo', notMatchToRule, 'should not match to %{expected}');
registerRule('maxItems', maxItemsRule, 'must contain less than %{expected} items');
registerRule('maxLength', maxLengthRule, 'is too long (maximum is %{expected} characters)');
registerRule('max', maxRule, 'must be less than or equal to %{expected}');
registerRule('minItems', minItemsRule, 'must contain more than %{expected} items');
registerRule('minLength', minLengthRule, 'is too short (minimum is %{expected} characters)');
registerRule('min', minRule, 'must be greater than or equal to %{expected}');
registerRule('pattern', patternRule, 'invalid input');
registerRule('required', requiredRule, 'is required');
registerRule('type', typeRule, 'must be of %{expected} type');
registerRule('uniqueItems', uniqueItemsRule, 'must hold an unique set of values');
