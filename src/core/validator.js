import { getRule } from './rules';
import { isFunction, isString, isObject, isArray, noop, handlePromise, handlePromises, getObjectOverride, formatMessage } from './utils';

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

export function validateProperty(property, obj, properties = {}, rules = {}, messages = {}) {
  const {
    rules: propertyRules = {},
    messages: propertyMessages = {},
    properties: propertyProperties
  } = properties[property];

  propertyRules.__proto__ = rules;
  propertyMessages.__proto__ = messages;

  const value = obj[property];

  return validateValue(value, propertyRules, propertyMessages, obj, property, properties)
    .then(valueValidationResult => {
      let errors = valueValidationResult.getErrors();

      if (propertyProperties) {
        const subValidationCallback = (result) => {
          errors.__proto__ = result.getErrors();

          return new ValidationResult(errors);
        };

        if (isArray(value)) {
          return validateArray(value, propertyProperties, rules, messages)
            .then(subValidationCallback);
        } else if (isObject(value)) {
          return validateObject(value, propertyProperties, rules, messages)
            .then(subValidationCallback);
        }
      }

      return new ValidationResult(errors);
    });
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

export function validate(schema, obj) {
  const {
    rules,
    messages,
    properties,
  } = schema;

  return validateObject(obj, properties || schema, rules, messages);
}

/**
 * Use that only in cause if you don't have any async actions.
 * Otherwise result will be undefined
 * Highly recommended to use 'validate' function instead
 * */
export function validateSync(schema, obj) {
  const promise = validate(schema, obj);

  return promise && promise.value;
}

export class ValidationResult {
  constructor(errors = {}) {
    return {
      ...this,
      ...errors.__proto__,
      ...errors,
      _invokeActionFor(property, action, ...args) {
        return errors[property] && errors[property][action] && errors[property][action](...args);
      },
      isValid() {
        return !this.hasErrors();
      },
      hasErrors() {
        const keys = [
          ...Object.keys(errors.__proto__),
          ...Object.keys(errors)
        ];

        return keys.some(key => {
          if (errors[key].hasErrors) {
            return errors[key].hasErrors();
          }

          return errors[key];
        });
      },
      hasErrorsFor(property) {
        return this._invokeActionFor(property, 'hasErrors');
      },
      hasErrorsOfTypes(...types) {
        const keys = [
          ...Object.keys(errors.__proto__),
          ...Object.keys(errors)
        ];

        return keys.some(key => {
          if (types.indexOf(key) !== -1) {
            return true;
          }

          if (errors[key].hasErrorsOfTypes) {
            return errors[key].hasErrorsOfTypes(...types);
          }

          return false;
        });
      },
      hasErrorsOfTypesFor(property, ...types) {
        return this._invokeActionFor(property, 'hasErrorsOfTypes', ...types);
      },
      getErrors() {
        return {
          ...errors
        };
      },
      getErrorsFor(property) {
        return this._invokeActionFor(property, 'getErrors');
      },
      getErrorsAsArray(...exclude) {
        return Object
          .keys(errors)
          .filter(key => exclude.indexOf(key) === -1)
          .map(key => errors[key]);
      },
      getErrorsAsArrayFor(property, ...exclude) {
        return this._invokeActionFor(property, 'getErrorsAsArray', ...exclude);
      },
      getFirstError(...exclude) {
        return (this.getErrorsAsArray(exclude) || [])[0];
      },
      getFirstErrorFor(property, ...exclude) {
        return (this.getErrorsAsArrayFor(property, ...exclude) || [])[0];
      }
    };
  }
}

export class ValidationSchema {
  constructor(schema) {
    this.validate = validate.bind(this, schema);
    this.validateSync = validateSync.bind(this, schema);
  }
}
