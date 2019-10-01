import { hasOwnProperty, castArray } from './utils';
import * as rules from './rules/index';

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
    check: rule,
  };
}

/**
 * Register batch validation rule
 *
 * @param {Array} rules - rules to register
 */
export function registerRules(rules) {
  for (const rule of rules) {
    if (rule && rule.ruleName) {
      const ruleNames = castArray(rule.ruleName);

      for (const ruleName of ruleNames) {
        registerRule(ruleName, rule, rule.defaultMessage);
      }
    }
  }
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

registerRules(Object.values(rules));
