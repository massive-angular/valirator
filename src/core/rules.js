let rulesHolder = {};

export function registerRule(name, rule, message) {
  if (!Object.hasOwnProperty(name)) {
    Object.defineProperty(rulesHolder, name, {
      value: {
        name,
        message,
        check: rule
      }
    });
  } else {
    throw Error('Rule already defined');
  }
}

export function hasRule(name) {
  return rulesHolder.hasOwnProperty(name);
}

export function getRule(name) {
  return rulesHolder[name] || {};
}
