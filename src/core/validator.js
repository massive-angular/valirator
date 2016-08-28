import { getRule } from './rules';
import { isFunction, isObject, isArray, noop, getObjectOverride, handlePromise, formatMessage } from './utils';

export function validateRule(rule, expected, value, message, rules, messages, obj, property, schema) {
  return new Promise((resolve, reject) => {
    const {
      check: defaultRule = noop,
      message: defaultMessage
    } = getRule(rule);

    const overriddenRule = rules && (getObjectOverride(rules, rule) || rules[rule]);
    const overriddenMessage = messages && (getObjectOverride(messages, rule) || messages[rule]);

    const isValid = (isFunction(overriddenRule) ? overriddenRule : defaultRule)(value, expected, obj, property, schema, defaultRule);
    const callback = (isValid) => {
      if (isValid !== true) {
        formatMessage(overriddenMessage || message || defaultMessage, value, expected, property, obj, rule)
          .then(resolve)
          .catch(reject);
      } else {
        resolve();
      }
    };

    handlePromise(isValid, callback, reject);
  });
}

export function validateValue(value, rules = {}, messages = {}, obj, property, schema) {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(rules);
    const promises = keys.map(rule => {
      const expected = rules[rule];
      const message = messages[rule];

      return validateRule(rule, expected, value, message, rules, messages, obj, property, schema);
    });

    Promise.all(promises)
      .then(results => {
        let errors = {};

        results.forEach((result, i) => {
          if (result) {
            errors[keys[i]] = result;
          }
        });

        resolve(new ValidationResult(errors));
      })
      .catch(reject);
  });
}

export function validateProperty(property, obj, properties = {}, rules = {}, messages = {}) {
  return new Promise((resolve, reject) => {
    const {
      rules: propertyRules = {},
      messages: propertyMessages = {},
      properties: propertyProperties
    } = properties[property];

    propertyRules.__proto__ = rules;
    propertyMessages.__proto__ = messages;

    const value = obj[property];

    validateValue(value, propertyRules, propertyMessages, obj, property, properties)
      .then(valueValidationResult => {
        let errors = valueValidationResult.getErrors();

        if (propertyProperties) {
          const subValidationCallback = (result) => {
            errors.__proto__ = result.getErrors();

            resolve(new ValidationResult(errors));
          };

          if (isArray(value)) {
            return validateArray(value, propertyProperties, rules, messages)
              .then(subValidationCallback)
              .catch(reject);
          } else if (isObject(value)) {
            return validateObject(value, propertyProperties, rules, messages)
              .then(subValidationCallback)
              .catch(reject);
          }
        }

        resolve(new ValidationResult(errors));
      })
      .catch(reject);
  });
}

export function validateArray(array, properties, rules = {}, messages = {}) {
  return new Promise((resolve, reject) => {
    const promises = array.map(item => validateObject(item, properties, rules, messages));

    Promise.all(promises)
      .then(results => {
        let errors = {};

        results.forEach((result, i) => {
          errors[i] = result;
        });

        resolve(new ValidationResult(errors));
      })
      .catch(reject);
  });
}

export function validateObject(obj, properties, rules = {}, messages = {}) {
  return new Promise((resolve, reject) => {
    const keys = Object.keys(properties);
    const promises = keys.map(property => validateProperty(property, obj, properties, rules, messages));

    Promise.all(promises)
      .then(results => {
        let errors = {};

        results.forEach((result, i) => {
          errors[keys[i]] = result;
        });

        resolve(new ValidationResult(errors));
      })
      .catch(reject);
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
  }
}
