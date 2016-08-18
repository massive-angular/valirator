import { getRule } from './rules';
import { isFunction, isObject, isArray, noop, getObjectOverride, formatMessage } from './utils';

export async function validateRule(rule, expected, value, message, rules, messages, property, obj, schema) {
  const {
    check: defaultRule,
    message: defaultMessage
  } = getRule(rule);

  const overriddenRule = rules && (getObjectOverride(rules, rule) || rules[rule]);
  const overriddenMessage = messages && (getObjectOverride(messages, rule) || messages[rule]);

  const isValid = await (isFunction(overriddenRule) ? overriddenRule : (defaultRule || noop))(value, expected, property, obj, schema, defaultRule);

  if (isValid !== true) {
    return await formatMessage(overriddenMessage || message || defaultMessage, value, expected, property, obj, rule);
  }
}

export async function validateValue(value, rules = {}, messages = {}, property, obj, schema) {
  let errors = {};

  for (const rule in rules) {
    if (rules.hasOwnProperty(rule)) {
      const expected = rules[rule];
      const message = messages[rule];

      const result = await validateRule(rule, expected, value, message, rules, messages, property, obj, schema);

      if (result) {
        errors[rule] = result;
      }
    }
  }

  return errors;
}

export async function validateProperty(property, obj, properties = {}, rules = {}, messages = {}, errors = {}) {
  const {
    rules: propertyRules = {},
    messages: propertyMessages = {},
    properties: propertyProperties
  } = properties[property];

  propertyRules.__proto__ = rules;
  propertyMessages.__proto__ = messages;

  const value = obj[property];

  const propertyErrors = await validateValue(value, propertyRules, propertyMessages, property, obj, properties);

  if (propertyProperties) {
    if (isObject(value)) {
      await validateObject(value, propertyProperties, rules, messages, propertyErrors);
    } else if (isArray(value)) {
      const ln = value.length;

      for (let i = 0; i < ln; i++) {
        const item = value[i];
        const itemErrors = propertyErrors[i] || (propertyErrors[i] = {});

        await validateObject(item, propertyProperties, rules, messages, itemErrors);
      }
    }
  }

  errors[property] = propertyErrors;

  return errors;
}

export async function validateObject(obj, properties, rules = {}, messages = {}, errors = {}) {
  for (const property in properties) {
    if (properties.hasOwnProperty(property)) {
      await validateProperty(property, obj, properties, rules, messages, errors);
    }
  }

  return errors;
}

export async function validate(schema, obj) {
  const {
    rules,
    messages,
    properties,
  } = schema;

  return await validateObject(obj, properties || schema, rules, messages, {});
}

export class ValidationSchema {
  constructor(schema) {
    this.validate = validate.bind(this, schema);
  }
}
