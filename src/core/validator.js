import { getRule } from './rules';
import {
  isFunction,
  isString,
  isObject,
  isArray,
  noop,
  handlePromise,
  handlePromises,
  getObjectOverride,
  formatMessage
} from './utils';

import { ValidationResult } from './ValidationResult';

export function validateRule(rule, expected, value, message, rules, messages, obj, property, schema) {
  const {
    check: defaultRule = noop,
    message: defaultMessage
  } = getRule(rule);

  const overriddenRule = rules && (getObjectOverride(rules, rule) || rules[rule]);
  const overriddenMessage = messages && (getObjectOverride(messages, rule) || messages[rule]);

  const isValid = (isFunction(overriddenRule) ? overriddenRule : defaultRule)(value, expected, obj, property, schema, defaultRule);

  return handlePromise(isValid)
    .then(result => {
      if (isString(result)) {
        return result;
      } else if (result !== true) {
        return formatMessage(overriddenMessage || message || defaultMessage, value, expected, property, obj, rule);
      }
    });
}

export function validateRuleSync(rule, expected, value, message, rules, messages, obj, property, schema) {
  const promise = validateRule(rule, expected, value, message, rules, messages, obj, property, schema);

  return promise && promise.value;
}

export function validateValue(value, rules = {}, messages = {}, obj, property, schema) {
  const keys = Object.keys(rules);
  const promises = keys.map(rule => {
    const expected = rules[rule];
    const message = messages[rule];

    return validateRule(rule, expected, value, message, rules, messages, obj, property, schema);
  });

  return handlePromises(promises)
    .then(results => {
      let errors = {};

      results.forEach((result, i) => {
        if (result) {
          errors[keys[i]] = result;
        }
      });

      return new ValidationResult(errors);
    });
}

export function validateValueSync(value, rules, messages, obj, property, schema) {
  const promise = validateValue(value, rules, messages, obj, property, schema);

  return promise && promise.value;
}

export function validateProperty(property, obj, properties = {}, rules = {}, messages = {}) {
  const {
    rules: propertyRules = properties[property] || {},
    messages: propertyMessages = {},
    properties: propertyProperties
  } = properties[property];

  propertyRules.__proto__ = rules;
  propertyMessages.__proto__ = messages;

  const value = obj[property];

  return validateValue(value, propertyRules, propertyMessages, obj, property, properties)
    .then(valueValidationResult => {
      if (propertyProperties) {
        const subValidationCallback = (subValidationResult) => {
          valueValidationResult.__proto__ = subValidationResult;

          return new ValidationResult(valueValidationResult);
        };

        if (isArray(value)) {
          return validateArray(value, propertyProperties, rules, messages)
            .then(subValidationCallback);
        } else if (isObject(value)) {
          return validateObject(value, propertyProperties, rules, messages)
            .then(subValidationCallback);
        }
      }

      return new ValidationResult(valueValidationResult);
    });
}

export function validatePropertySync(property, obj, properties, rules, messages) {
  const promise = validateProperty(property, obj, properties, rules, messages);

  return promise && promise.value;
}

export function validateArray(array, properties, rules = {}, messages = {}) {
  const promises = array.map(item => validateObject(item, properties, rules, messages));

  return handlePromises(promises)
    .then(results => {
      let errors = {};

      results.forEach((result, i) => {
        errors[i] = result;
      });

      return new ValidationResult(errors);
    });
}

export function validateArraySync(array, properties, rules, messages) {
  const promise = validateArray(array, properties, rules, messages);

  return promise && promise.value;
}

export function validateObject(obj, properties, rules = {}, messages = {}) {
  const keys = Object.keys(properties);
  const promises = keys.map(property => validateProperty(property, obj, properties, rules, messages));

  return handlePromises(promises)
    .then(results => {
      let errors = {};

      results.forEach((result, i) => {
        errors[keys[i]] = result;
      });

      return new ValidationResult(errors);
    });
}

export function validateObjectSync(obj, properties, rules, messages) {
  const promise = validateObject(obj, properties, rules, messages);

  return promise && promise.value;
}

export function validate(schema, obj) {
  const {
    rules,
    messages,
    properties,
  } = schema;

  return validateObject(obj, properties || schema, rules, messages);
}

export function validateSync(schema, obj) {
  const promise = validate(schema, obj);

  return promise && promise.value;
}
