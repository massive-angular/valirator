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

  return new ValidationResult(errors);
}

export async function validateProperty(property, obj, properties = {}, rules = {}, messages = {}) {
  const {
    rules: propertyRules = {},
    messages: propertyMessages = {},
    properties: propertyProperties
  } = properties[property];

  propertyRules.__proto__ = rules;
  propertyMessages.__proto__ = messages;

  const value = obj[property];

  const valueValidationResult = await validateValue(value, propertyRules, propertyMessages, property, obj, properties);

  let errors = valueValidationResult.getErrors();

  if (propertyProperties) {
    if (isArray(value)) {
      const arrayValidationResult = await validateArray(value, propertyProperties, rules, messages);

      errors.__proto__ = arrayValidationResult.getErrors();
    } else if (isObject(value)) {
      const objectValidationResult = await validateObject(value, propertyProperties, rules, messages);

      errors.__proto__ = objectValidationResult.getErrors();
    }
  }

  return new ValidationResult(errors);
}

export async function validateArray(array, properties, rules = {}, messages = {}) {
  let errors = {};
  const ln = array.length;

  for (let i = 0; i < ln; i++) {
    errors[i] = await validateObject(array[i], properties, rules, messages);
  }

  return new ValidationResult(errors);
}

export async function validateObject(obj, properties, rules = {}, messages = {}) {
  let errors = {};

  for (const property in properties) {
    if (properties.hasOwnProperty(property)) {
      errors[property] = await validateProperty(property, obj, properties, rules, messages);
    }
  }

  return new ValidationResult(errors);
}

export async function validate(schema, obj) {
  const {
    rules,
    messages,
    properties,
  } = schema;

  return await validateObject(obj, properties || schema, rules, messages);
}

export class ValidationResult {
  constructor(errors = {}) {
    return {
      ...this,
      ...errors,
      ...errors.__proto__,
      _invokeActionFor(property, action, ...args) {
        return errors[property] && errors[property][action] && errors[property][action](...args);
      },
      isValid() {
        return !this.hasErrors();
      },
      hasErrors() {
        return Object
            .keys(errors)
            .some(key => {
              return errors[key];
            }) ||
          Object
            .keys(errors.__proto__)
            .some(key => {
              if (errors[key].hasErrors) {
                return errors[key].hasErrors();
              }

              return false;
            });
      },
      hasErrorsFor(property) {
        return this._invokeActionFor(property, 'hasErrors');
      },
      hasErrorsOfTypes(...types) {
        return Object
            .keys(errors)
            .some(key => {
              if (types.indexOf(key) !== -1) {
                return true;
              }
            }) ||
          Object
            .keys(errors.__proto__)
            .some(key => {
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
