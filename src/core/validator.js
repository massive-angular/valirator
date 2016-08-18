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

export async function validateValue(value, rules, messages, property, obj, schema) {
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

export async function validateProperty(property, obj, schemaProperties, schemaRules, schemaMessages, errors) {
  const {
    rules: propertyRules = {},
    messages: propertyMessages = {},
    properties: propertyProperties
  } = schemaProperties[property];

  propertyRules.__proto__ = schemaRules;
  propertyMessages.__proto__ = schemaMessages;

  const value = obj[property];

  const propertyErrors = await validateValue(value, propertyRules, propertyMessages, property, obj, schemaProperties);

  if (propertyProperties) {
    if (isObject(value)) {
      await validateObject(value, propertyProperties, schemaRules, schemaMessages, propertyErrors);
    } else if (isArray(value)) {
      const ln = value.length;

      for (let i = 0; i < ln; i++) {
        const item = value[i];
        const itemErrors = propertyErrors[i] || (propertyErrors[i] = {});

        await validateObject(item, propertyProperties, schemaRules, schemaMessages, itemErrors);
      }
    }
  }

  errors[property] = propertyErrors;

  return errors;
}

export async function validateObject(obj, schemaProperties, schemaRules, schemaMessages, errors) {
  for (const property in schemaProperties) {
    if (schemaProperties.hasOwnProperty(property)) {
      await validateProperty(property, obj, schemaProperties, schemaRules, schemaMessages, errors);
    }
  }

  return errors;
}

export async function validate(schema, obj) {
  const {
    rules: schemaRules = {},
    messages: schemaMessages = {},
    properties: schemaProperties,
  } = schema;

  return await validateObject(obj, schemaProperties || schema, schemaRules, schemaMessages, {});
}

export class ValidationSchema {
  constructor(schema) {
    this.validate = validate.bind(this, schema);
  }
}
