import { getRule } from './rules';
import {
  isFunction,
  isString,
  isObject,
  isArray,
  noop,
  handlePromise,
  handlePromises,
  getPropertyOverride,
  formatMessage,
  setPrototypeOf,
  getProperty,
} from './utils';

import { ValidationResult } from './ValidationResult';

export function validateRule(rule, expected, value, message, rules, messages, obj, property, schema) {
  const {
    check: defaultRule = noop,
    message: defaultMessage
  } = getRule(rule);

  const overriddenRule = rules && (getPropertyOverride(rules, rule) || rules[rule]);
  const overriddenMessage = messages && (getPropertyOverride(messages, rule) || messages[rule]);

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

export function validateProperty(property, obj, schema = {}, overrides = {}) {
  const propertyValue = getProperty(schema, property, {});
  let {
    rules: propertyRules,
    messages: propertyMessages = {},
    overrides: propertyOverrides = {},
    properties: propertyProperties,
  } = propertyValue;

  const {
    rules: overriddenRules = {},
    messages: overriddenMessages = {},
  } = overrides;

  if (!propertyRules) {
    if (!propertyValue.messages && !propertyValue.properties && !propertyValue.overrides) {
      propertyRules = propertyValue;
    } else {
      propertyRules = {};
    }
  }

  setPrototypeOf(propertyOverrides, overrides);
  setPrototypeOf(propertyRules, overriddenRules);
  setPrototypeOf(propertyMessages, overriddenMessages);

  const value = getProperty(obj, property);

  return validateValue(value, propertyRules, propertyMessages, obj, property, schema)
    .then(valueValidationResult => {
      if (propertyProperties) {
        const subValidationCallback = (subValidationResult) => {
          setPrototypeOf(valueValidationResult, subValidationResult);

          return new ValidationResult(valueValidationResult);
        };

        if (isArray(value)) {
          return validateArray(value, propertyProperties, propertyOverrides)
            .then(subValidationCallback);
        } else {
          let normalizedValue = {};

          if (isObject(value)) {
            normalizedValue = value;
          }

          return validateObject(normalizedValue , propertyProperties, propertyOverrides)
            .then(subValidationCallback);
        }
      }

      return new ValidationResult(valueValidationResult);
    });
}

export function validatePropertySync(property, obj, schema, overrides) {
  const promise = validateProperty(property, obj, schema, overrides);

  return promise && promise.value;
}

export function validateArray(array, schema, overrides = {}) {
  const promises = array.map(item => validateObject(item, schema, overrides));

  return handlePromises(promises)
    .then(results => {
      let errors = {};

      results.forEach((result, i) => {
        errors[i] = result;
      });

      return new ValidationResult(errors);
    });
}

export function validateArraySync(array, schema, overrides) {
  const promise = validateArray(array, schema, overrides);

  return promise && promise.value;
}

export function validateObject(obj, schema, overrides = {}) {
  const keys = Object.keys(schema);
  const promises = keys.map(property => validateProperty(property, obj, schema, overrides));

  return handlePromises(promises)
    .then(results => {
      let errors = {};

      results.forEach((result, i) => {
        errors[keys[i]] = result;
      });

      return new ValidationResult(errors);
    });
}

export function validateObjectSync(obj, schema, overrides) {
  const promise = validateObject(obj, schema, overrides);

  return promise && promise.value;
}

export function validate(schema, obj) {
  const {
    rules,
    messages,
    properties,
    overrides,
  } = schema;

  let valueValidationResult;

  return validateValue(obj, rules, messages)
    .then(result => {
      valueValidationResult = result;

      return validateObject(obj, properties || schema, overrides);
    })
    .then(objectValidationResult => {
      return new ValidationResult({
        ...valueValidationResult,
        ...objectValidationResult,
      });
    });
}

export function validateSync(schema, obj) {
  const promise = validate(schema, obj);

  return promise && promise.value;
}
