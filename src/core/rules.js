import { hasOwnProperty } from './utils';

let rulesHolder = {};

export function registerRule(name, rule, message) {
  if (hasOwnProperty(rulesHolder, name)) {
    console.warn(`[WARNING]: Trying to override defined rule '${name}'. Please use 'overrideRule' function instead.`);
  }

  rulesHolder[name] = {
    name,
    message,
    check: rule
  };
}

export function hasRule(name) {
  return hasOwnProperty(rulesHolder, name);
}

export function getRule(name) {
  return rulesHolder[name] || {};
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
