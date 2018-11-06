import { getRule, hasRule } from './storage';
import {
  noop,
  isFunction,
  isString,
  isArray,
  castArray,
  handlePromise,
  handlePromises,
  formatMessage,
  setPrototypeOf,
  getProperty,
  getPropertyOverride,
  hasOwnProperty,
} from './utils';

import ValidationResult from './validationResult';

/**
 * @description
 * Main endpoint for validation
 * Validate anything by specified schema
 *
 * @param {Object|Function} schema - Validation schema
 * @param {Object|Array} anything - Anything to validate
 * @returns {Promise<ValidationResult>}
 *
 * @example
 * import { validate } from 'valirator';
 *
 * const schema = {
 *    FirstName: {
 *      required: true,
 *    },
 *    LastName: {
 *      required: true,
 *    },
 * };
 *
 * const obj = {
 *   FirstName: 'Bob',
 * };
 *
 * const validationResult = await validate(schema, obj);
 */
export function validate(schema, anything) {
  return handlePromise(isFunction(schema) ? schema(anything) : schema).then(builtSchema =>
    validateProperty(undefined, anything, builtSchema),
  );
}

/**
 * @description
 * Wrapper on validate function for sync validation
 * Can be used if no async operation defined (rule or message)
 *
 * @param {Object|Function} schema - Validation schema
 * @param {Object|Array} anything - Anything to validate
 * @returns {ValidationResult}
 */
export function validateSync(schema, anything) {
  const promise = validate(isFunction(schema) ? schema(anything) : schema, anything);

  return promise && promise.value;
}

/**
 *
 * @param obj
 * @param schema
 * @param overrides
 * @returns {Promise<ValidationResult>}
 */
export function validateObject(obj, schema, overrides = {}) {
  const keys = Object.keys(schema);
  const promises = keys.map(property => validateProperty(property, obj, schema, overrides));

  return handlePromises(promises).then(results => {
    let errors = {};

    results.forEach((result, i) => {
      errors[keys[i]] = result;
    });

    return new ValidationResult(errors);
  });
}

/**
 *
 * @param obj
 * @param schema
 * @param overrides
 * @returns {ValidationResult}
 */
export function validateObjectSync(obj, schema, overrides) {
  const promise = validateObject(obj, schema, overrides);

  return promise && promise.value;
}

/**
 *
 * @param array
 * @param schema
 * @param overrides
 * @returns {Promise<ValidationResult>}
 */
export function validateArray(array, schema, overrides = {}) {
  const promises = (array || []).map(item => validateObject(item, schema, overrides));

  return handlePromises(promises).then(results => {
    let errors = {};

    results.forEach((result, i) => {
      errors[i] = result;
    });

    return new ValidationResult(errors);
  });
}

/**
 *
 * @param array
 * @param schema
 * @param overrides
 * @returns {ValidationResult}
 */
export function validateArraySync(array, schema, overrides) {
  const promise = validateArray(array, schema, overrides);

  return promise && promise.value;
}

/**
 *
 * @param property
 * @param obj
 * @param schema
 * @param overrides
 * @returns {Promise<ValidationResult>}
 */
export function validateProperty(property, obj, schema = {}, overrides = {}) {
  const propertyValue = getProperty(schema, property, {});
  let {
    __isArray__,
    rules: propertyRules,
    messages: propertyMessages = {},
    overrides: propertyOverrides = {},
    properties: propertyProperties,
  } = propertyValue;

  const { rules: overriddenRules = {}, messages: overriddenMessages = {} } = overrides;

  if (!propertyRules && !propertyProperties) {
    const propertyKeys = Object.keys(propertyValue);
    const hasRuleProperty = propertyKeys.some(
      key => hasRule(key) || hasOwnProperty(overriddenRules, key) || isFunction(propertyValue[key]),
    );

    if (hasRuleProperty) {
      propertyRules = propertyValue;
    }
  }

  if (!propertyRules && !propertyProperties) {
    propertyProperties = propertyValue;
  }

  if (!propertyRules) {
    propertyRules = {};
  }

  if (!propertyProperties) {
    propertyProperties = {};
  }

  setPrototypeOf(propertyOverrides, overrides);
  setPrototypeOf(propertyRules, overriddenRules);
  setPrototypeOf(propertyMessages, overriddenMessages);

  const value = getProperty(obj, property);

  return validateValue(value, propertyRules, propertyMessages, obj, property, schema).then(valueValidationResult => {
    if (propertyProperties) {
      const subValidationCallback = subValidationResult => {
        setPrototypeOf(valueValidationResult, subValidationResult);

        return new ValidationResult(valueValidationResult);
      };

      if (isArray(value) || __isArray__) {
        return validateArray(value, propertyProperties, propertyOverrides).then(subValidationCallback);
      } else {
        return validateObject(value, propertyProperties, propertyOverrides).then(subValidationCallback);
      }
    }

    return new ValidationResult(valueValidationResult);
  });
}

/**
 *
 * @param property
 * @param obj
 * @param schema
 * @param overrides
 * @returns {ValidationResult}
 */
export function validatePropertySync(property, obj, schema, overrides) {
  const promise = validateProperty(property, obj, schema, overrides);

  return promise && promise.value;
}

/**
 *
 * @param value
 * @param rules
 * @param messages
 * @param obj
 * @param property
 * @param schema
 * @returns {Promise<ValidationResult>}
 */
export function validateValue(value, rules = {}, messages = {}, obj, property, schema) {
  const keys = Object.keys(rules);
  const promises = keys.map(rule => {
    const expected = rules[rule];
    const message = messages[rule];

    return validateRule(rule, expected, value, message, rules, messages, obj, property, schema);
  });

  return handlePromises(promises).then(results => {
    let errors = {};

    results.forEach((result, i) => {
      if (result) {
        errors[keys[i]] = result;
      }
    });

    return new ValidationResult(errors);
  });
}

/**
 *
 * @param value
 * @param rules
 * @param messages
 * @param obj
 * @param property
 * @param schema
 * @returns {ValidationResult}
 */
export function validateValueSync(value, rules, messages, obj, property, schema) {
  const promise = validateValue(value, rules, messages, obj, property, schema);

  return promise && promise.value;
}

/**
 *
 * @param rule
 * @param expected
 * @param value
 * @param message
 * @param rules
 * @param messages
 * @param obj
 * @param property
 * @param schema
 * @returns {Promise<boolean>}
 */
export function validateRule(rule, expected, value, message, rules, messages, obj, property, schema) {
  const { check: defaultRule = noop, message: defaultMessage } = getRule(rule);

  const overriddenRule = rules && (getPropertyOverride(rules, rule) || rules[rule]);
  const overriddenMessage = messages && (getPropertyOverride(messages, rule) || messages[rule]);

  const ruleFn = isFunction(overriddenRule) ? overriddenRule : defaultRule;
  const ruleMsg = overriddenMessage || message || defaultMessage;

  const expects = castArray(expected);
  const validations = expects.map(exp => handlePromise(ruleFn(value, exp, obj, property, schema, defaultRule)));

  return handlePromises(validations).then(results => {
    const hasValidResult = results.some(result => result === true);

    if (!hasValidResult) {
      const result = results.find(result => result !== true);

      if (isString(result)) {
        return result;
      } else if (result !== true) {
        return formatMessage(
          ruleMsg,
          value,
          expects.join(', '),
          getProperty(schema, `${property}.alias`) || property,
          obj,
          rule,
        );
      }
    }
  });
}

/**
 *
 * @param rule
 * @param expected
 * @param value
 * @param message
 * @param rules
 * @param messages
 * @param obj
 * @param property
 * @param schema
 * @returns {boolean}
 */
export function validateRuleSync(rule, expected, value, message, rules, messages, obj, property, schema) {
  const promise = validateRule(rule, expected, value, message, rules, messages, obj, property, schema);

  return promise && promise.value;
}
