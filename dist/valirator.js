'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @description
 * Empty function
 */
function noop() {}

/**
 * @description
 * Check if type
 *
 * @param obj
 * @param {string} typeStr - type string like: '[object Object]', '[object Array]' and etc
 * @returns {boolean}
 */
function isType(obj, typeStr) {
  return Object.prototype.toString.call(obj) === typeStr;
}

/**
 * @description
 * Check if is Object
 *
 * @param obj
 * @returns {boolean}
 */
function isObject(obj) {
  return isType(obj, '[object Object]');
}

/**
 * @description
 * Check if is Array
 *
 * @param obj
 * @returns {boolean}
 */
function isArray(obj) {
  return isType(obj, '[object Array]');
}

/**
 * @description
 * Check if is Function
 *
 * @param obj
 * @returns {boolean}
 */
function isFunction(obj) {
  return isType(obj, '[object Function]');
}

/**
 * @description
 * Check if is String
 *
 * @param obj
 * @returns {boolean}
 */
function isString(obj) {
  return isType(obj, '[object String]');
}

/**
 * @description
 * Check if is Date
 *
 * @param obj
 * @returns {boolean}
 */
function isDate(obj) {
  return isType(obj, '[object Date]');
}

/**
 * @description
 * Check if is Number
 *
 * @param obj
 * @returns {boolean}
 */
function isNumber(obj) {
  return isType(obj, '[object Number]') && !isNaN(obj);
}

/**
 * @description
 * Check if is Boolean
 *
 * @param obj
 * @returns {boolean}
 */
function isBoolean(obj) {
  return isType(obj, '[object Boolean]');
}

/**
 * @description
 * Check if is Empty
 * Empty string -> true
 * Empty array -> true
 * Empty object -> true
 *
 * Anything else -> false
 *
 * @param obj
 * @returns {boolean}
 */
function isEmpty(obj) {
  return obj === '' || (isArray(obj) && obj.length === 0) || (isObject(obj) && Object.keys(obj).length === 0);
}

/**
 * @description
 * Check if is Null
 *
 * @param obj
 * @returns {boolean}
 */
function isNull(obj) {
  return isType(obj, '[object Null]');
}

/**
 * @description
 * Check if is Undefined
 *
 * @param obj
 * @returns {boolean}
 */
function isUndefined(obj) {
  return isType(obj, '[object Undefined]');
}

/**
 * @description
 * Check is is Null or Undefined
 *
 * @param obj
 * @returns {boolean}
 */
function isNullOrUndefined(obj) {
  return isNull(obj) || isUndefined(obj);
}

/**
 * @description
 * Check is object is defined (not null, not undefined, not empty string, object or array
 *
 * @param obj
 * @returns {boolean}
 */
function isDefined(obj) {
  return !(isNullOrUndefined(obj) || isEmpty(obj));
}

/**
 * @description
 * Safe convert to String
 *
 * @param obj
 * @returns {string}
 */
function toString(obj) {
  return String(obj);
}

/**
 * @description
 * Safe indexOf
 *
 * @param array
 * @param value
 * @returns {Number}
 */
function indexOf(array, value) {
  if (!isArray(array)) {
    return -1;
  }

  return array.indexOf(value);
}

/**
 * @description
 * Safe check if value in array
 *
 * @param array
 * @param value
 * @returns {boolean}
 */
function inArray(array, value) {
  return isArray(array) && indexOf(array, value) !== -1;
}

/**
 * @description
 * Cast item to array
 *
 * @param array
 * @returns {Array}
 */
function castArray(array) {
  return isArray(array) ? array : [array];
}

/**
 * @description
 * Safe check is object has property
 *
 * @param obj
 * @param {string} prop - property name
 * @returns {boolean}
 */
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/**
 * @description
 * Safe set prototype
 *
 * @param obj
 * @param proto
 * @returns {Object}
 */
function setPrototypeOf(obj, proto) {
  if (Object.setPrototypeOf) {
    return Object.setPrototypeOf(obj, proto);
  }

  obj.__proto__ = proto;

  return obj;
}

/**
 * @description
 * Safe get prototype
 *
 * @param obj
 * @returns {*}
 */
function getPrototypeOf(obj) {
  if (Object.getPrototypeOf) {
    return Object.getPrototypeOf(obj);
  }

  return obj.__proto__;
}

/**
 * @description
 * Get property value
 *
 * @param {Object} obj
 * @param {string} path
 * @param fallback - fallback value
 * @returns {*}
 */
function getProperty(obj, path = '', fallback = null) {
  let result = obj;
  let prop = toString(path);

  if (path === '') {
    return result;
  }

  if (!isDefined(obj)) {
    return fallback;
  }

  do {
    if (isObject(result)) {
      if (hasOwnProperty(result, prop)) {
        return result[prop];
      }

      const [first, ...rest] = prop.split('.');

      result = result[first];
      prop = rest.join('.');
    } else {
      break;
    }
  } while (prop);

  if (result === null || result === undefined) {
    return fallback;
  }

  return result;
}

/**
 * @description
 * Get property override in chain
 *
 * @param {Object} context
 * @param {string} prop
 * @returns {*}
 */
function getPropertyOverride(context, prop) {
  if (!context) {
    return false;
  }

  return isFunction(context[prop]) ? context[prop] : getPropertyOverride(getPrototypeOf(context), prop);
}

/**
 * @description
 * Handle Promise or PromiseLike object
 *
 * @param {Promise|PromiseLike} promise
 * @returns {Promise|PromiseLike}
 */
function handlePromise(promise) {
  if (promise && promise.then) {
    return promise;
  }

  return {
    then: cb => handlePromise(cb(promise)),
    catch: noop,
    value: promise,
    isPromiseLike: true,
  };
}

/**
 * @description
 * Handle array of Promises or PromiseLike objects
 *
 * @param promises
 * @returns {Promise|PromiseLike}
 */
function handlePromises(promises) {
  const isAnyPromiseNotPromiseLike = promises.some(promise => promise && promise.then && !promise.isPromiseLike);
  if (isAnyPromiseNotPromiseLike) {
    return Promise.all(promises);
  }

  const results = promises.map(promise => promise.value);

  return handlePromise(results);
}

/**
 * @description
 * Format message for rule
 *
 * @param {string|Function} message - message template
 * @param {*} actual - actual value
 * @param {*} expected - expected value
 * @param {string} property - validating property
 * @param {Object} obj - validating object
 * @param {Function} rule - validating function
 * @returns {Promise<string>|PromiseLike<string>}
 */
function formatMessage(
  message = 'No default message for rule "%{rule}"',
  actual,
  expected,
  property,
  obj,
  rule,
) {
  const lookup = {
    actual,
    expected,
    property,
    rule,
  };

  const formattedMessage = isFunction(message)
    ? message(actual, expected, property, obj)
    : isString(message)
      ? message.replace(/%\{([a-z]+)\}/gi, (_, match) => lookup[match.toLowerCase()] || '')
      : message;

  return handlePromise(formattedMessage);
}

/**
 * @typedef {Object} PromiseLike
 * @property {Function} then
 * @property {Function} catch
 * @property {*} value
 * @property {boolean} isPromiseLike
 */

/**
 *
 * @param value
 * @param divisibleBy
 * @returns {boolean}
 */
function divisibleByRule(value, divisibleBy) {
  if (!isDefined(value)) {
    return true;
  }

  let multiplier = Math.max(
    toString(value - Math.floor(value)).length - 2,
    toString(divisibleBy - Math.floor(divisibleBy)).length - 2,
  );

  multiplier = multiplier > 0 ? Math.pow(10, multiplier) : 1;

  return (value * multiplier) % (divisibleBy * multiplier) === 0;
}

/**
 *
 * @param value
 * @param e
 * @returns {boolean}
 */
function enumRule(value, e) {
  if (!isDefined(value)) {
    return true;
  }

  return inArray(e, value);
}

/* eslint-disable no-control-regex,no-useless-escape */

const FORMATS = {
  int: /^-?\d+$/,
  float: /^-?\d+\.\d+$/,
  number: /^-?\d+\.?\d*$/,
  email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
  ip: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/i,
  ipv6: /^([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}$/,
  time: /^\d{2}:\d{2}:\d{2}$/,
  date: /^\d{4}-\d{2}-\d{2}$/,
  'date-time': /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:.\d{1,3})?Z$/,
  color: /^#[a-z0-9]{6}|#[a-z0-9]{3}|(?:rgb\(\s*(?:[+-]?\d+%?)\s*,\s*(?:[+-]?\d+%?)\s*,\s*(?:[+-]?\d+%?)\s*\))aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow$/i,
  'host-name': /^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])/,
  url: /^(https?|ftp|git):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
  regex: {
    test: function test(value) {
      try {
      } catch (e) {
        return false;
      }

      return true;
    },
  },
};

/**
 *
 * @param value
 * @param format
 * @returns {boolean}
 */
function formatRule(value, format) {
  if (!isDefined(value)) {
    return true;
  }

  if (!FORMATS[format]) {
    throw new Error(`Unknown format "${format}"`);
  }

  return FORMATS[format].test(value);
}

/**
 *
 * @param name
 * @param format
 */
function addFormatToFormatRule(name, format) {
  if (isString(format)) {
    FORMATS[name] = new RegExp(format);
  } else if (isFunction(format)) {
    FORMATS[name] = {
      test: format,
    };
  } else {
    FORMATS[name] = format;
  }
}

/**
 *
 * @param value
 * @param lessThan
 * @returns {boolean}
 */
function lessThanRule(value, lessThan) {
  return value < lessThan;
}

/**
 *
 * @param value
 * @param lessThanProperty
 * @param obj
 * @returns {boolean}
 */
function lessThanPropertyRule(value, lessThanProperty, obj) {
  return value < obj[lessThanProperty];
}

/**
 *
 * @param value
 * @param moreThan
 * @returns {boolean}
 */
function moreThanRule(value, moreThan) {
  return value > moreThan;
}

/**
 *
 * @param value
 * @param moreThanProperty
 * @param obj
 * @returns {boolean}
 */
function moreThanPropertyRule(value, moreThanProperty, obj) {
  return value > obj[moreThanProperty];
}

/**
 *
 * @param value
 * @param matchTo
 * @returns {boolean}
 */
function matchToRule(value, matchTo) {
  return value === matchTo;
}

/**
 *
 * @param value
 * @param matchToProperty
 * @param obj
 * @returns {boolean}
 */
function matchToPropertyRule(value, matchToProperty, obj) {
  return value === obj[matchToProperty];
}

/**
 *
 * @param value
 * @param notMatchTo
 * @returns {*}
 */
function notMatchToRule(value, notMatchTo) {
  return castArray(notMatchTo).every(not => not !== value);
}

/**
 *
 * @param value
 * @param notMatchToProperties
 * @param obj
 * @returns {*}
 */
function notMatchToPropertiesRule(value, notMatchToProperties, obj) {
  return castArray(notMatchToProperties).every(not => obj[not] !== value);
}

/**
 *
 * @param value
 * @param max
 * @returns {boolean}
 */
function maxRule(value, max) {
  if (!isDefined(value)) {
    return true;
  }

  return value <= max;
}

/**
 *
 * @param value
 * @param maxItems
 * @returns {boolean}
 */
function maxItemsRule(value, maxItems) {
  if (!isDefined(value)) {
    return true;
  }

  return isArray(value) && value.length <= maxItems;
}

/**
 *
 * @param value
 * @param maxLength
 * @returns {boolean}
 */
function maxLengthRule(value, maxLength) {
  if (!isDefined(value)) {
    return true;
  }

  return value.length <= maxLength;
}

/**
 *
 * @param value
 * @param min
 * @returns {boolean}
 */
function minRule(value, min) {
  if (!isDefined(value)) {
    return true;
  }

  return value >= min;
}

/**
 *
 * @param value
 * @param minItems
 * @returns {boolean}
 */
function minItemsRule(value, minItems) {
  if (!isDefined(value)) {
    return true;
  }

  return isArray(value) && value.length >= minItems;
}

/**
 *
 * @param value
 * @param minLength
 * @returns {boolean}
 */
function minLengthRule(value, minLength) {
  if (!isDefined(value)) {
    return true;
  }

  return value.length >= minLength;
}

/**
 *
 * @param value
 * @param patterns
 * @returns {boolean}
 */
function patternRule(value, patterns) {
  if (!isDefined(value)) {
    return true;
  }

  patterns = castArray(patterns).map(pattern => (isString(pattern) ? new RegExp(pattern) : pattern));

  return patterns.every(pattern => pattern.test(value));
}

/**
 *
 * @param value
 * @param required
 * @returns {*}
 */
function requiredRule(value, required) {
  if (isBoolean(required) && !required) {
    return true;
  }

  if (isObject(required)) {
    const { allowEmpty, allowZero } = required;

    if (isBoolean(allowEmpty)) {
      return allowEmpty && value === '';
    }

    if (isBoolean(allowZero)) {
      return allowZero && value === 0;
    }
  }

  return !!value && isDefined(value);
}

function checkValueType(value, type) {
  switch (type) {
    case 'boolean':
      return isBoolean(value);

    case 'number':
      return isNumber(value);

    case 'string':
      return isString(value);

    case 'date':
      return isDate(value);

    case 'object':
      return isObject(value);

    case 'array':
      return isArray(value);

    default:
      return true;
  }
}

/**
 *
 * @param value
 * @param type
 * @returns {boolean}
 */
function typeRule(value, type) {
  if (!isDefined(value)) {
    return true;
  }

  let types = type;

  if (!Array.isArray(type)) {
    types = [type];
  }

  return types.some(type => checkValueType(value, type));
}

/**
 *
 * @param value
 * @param uniqueItems
 * @returns {boolean}
 */
function uniqueItemsRule(value, uniqueItems) {
  if (!isDefined(value)) {
    return true;
  }

  if (!uniqueItems) {
    return true;
  }

  const hash = {};

  let i = 0,
    ln = value.length;
  for (; i < ln; i++) {
    const key = JSON.stringify(value[i]);
    if (hash[key]) {
      return false;
    }

    hash[key] = true;
  }

  return true;
}

const rulesStorage = {};

/**
 * Register validation rule
 *
 * @param {string} name - rule name
 * @param {Function} rule - rule function
 * @param {string|Function} message - rule message
 */
function registerRule(name, rule, message) {
  if (hasOwnProperty(rulesStorage, name)) {
    console.warn(`[WARNING]: Trying to override defined rule '${name}'. Please use 'overrideRule' function instead.`);
  }

  rulesStorage[name] = {
    name,
    message,
    check: rule,
  };
}

/**
 * Check if rule is registered
 *
 * @param {string} name - rule name
 * @returns {boolean}
 */
function hasRule(name) {
  return hasOwnProperty(rulesStorage, name);
}

/**
 * Get rule by name
 *
 * @param {string} name
 * @returns {{name, message, check}}
 */
function getRule(name) {
  return rulesStorage[name] || {};
}

/**
 * Override rule by name
 *
 * @param {string} name - rule name
 * @param {Function} rule - rule function
 * @param {string|Function} message - rule message
 */
function overrideRule(name, rule, message) {
  if (hasRule(name)) {
    let defaultRule = getRule(name);

    defaultRule.check = rule;
    defaultRule.message = message || defaultRule.message;
  }
}

/**
 * Override rule message by name
 *
 * @param {string} name - rule name
 * @param {string|Function} message - rule message
 */
function overrideRuleMessage(name, message) {
  if (hasRule(name)) {
    let defaultRule = getRule(name);

    defaultRule.message = message;
  }
}

registerRule('divisibleBy', divisibleByRule, 'must be divisible by %{expected}');
registerRule('enum', enumRule, 'must be present in given enumerator');
registerRule('format', formatRule, 'is not a valid %{expected}');
registerRule('lessThanProperty', lessThanPropertyRule, 'must be less than %{expected}');
registerRule('lessThanRule', lessThanRule, 'must be less than %{expected}');
registerRule('moreThanProperty', moreThanPropertyRule, 'must be greater than %{expected}');
registerRule('moreThan', moreThanRule, 'must be greater than %{expected}');
registerRule('matchToProperty', matchToPropertyRule, 'should match to %{expected}');
registerRule('matchTo', matchToRule, 'should match to %{expected}');
registerRule('notMatchToProperty', notMatchToPropertiesRule, 'should not match to %{expected}');
registerRule('notMatchToProperties', notMatchToPropertiesRule, 'should not match to %{expected}');
registerRule('notMatchTo', notMatchToRule, 'should not match to %{expected}');
registerRule('maxItems', maxItemsRule, 'must contain less than %{expected} items');
registerRule('maxLength', maxLengthRule, 'is too long (maximum is %{expected} characters)');
registerRule('max', maxRule, 'must be less than or equal to %{expected}');
registerRule('minItems', minItemsRule, 'must contain more than %{expected} items');
registerRule('minLength', minLengthRule, 'is too short (minimum is %{expected} characters)');
registerRule('min', minRule, 'must be greater than or equal to %{expected}');
registerRule('pattern', patternRule, 'invalid input');
registerRule('required', requiredRule, 'is required');
registerRule('type', typeRule, 'must be of %{expected} type');
registerRule('uniqueItems', uniqueItemsRule, 'must hold an unique set of values');

/**
 * @typedef ValidationResult
 * @property {boolean} isValid - check if validation result has not errors
 * @property {boolean} hasErrors - check if validation result has errors
 * @property {boolean} hasErrorsOfTypes - check if validation result has errors of specific types
 * @property {*} getErrors - get validation result errors
 * @property {*} getFirstErrors - get first validation result errors
 * @property {Array<*>} getErrorsAsArray - get validation result errors as array
 * @property {string} getFirstError - get first validation result error
 *
 * ValidationResult is util class that contain information about errors and any level
 *
 * @param {Object} errors - validation errors
 * @returns {ValidationResult}
 */
function ValidationResult(errors = {}) {
  const that = {
    ...getPrototypeOf(errors),
    ...errors,
  };

  Object.defineProperties(that, {
    isValid: {
      value: function isValid() {
        return !this.hasErrors();
      },
    },
    hasErrors: {
      value: function hasErrors() {
        const keys = Object.keys(that);

        return keys.some(key => {
          if (that[key].hasErrors) {
            return that[key].hasErrors();
          }

          return that[key];
        });
      },
    },
    hasErrorsOfTypes: {
      value: function hasErrorsOfTypes(...types) {
        const keys = Object.keys(that);

        return keys.some(key => {
          if (types.indexOf(key) !== -1) {
            return true;
          }

          if (that[key].hasErrorsOfTypes) {
            return that[key].hasErrorsOfTypes(...types);
          }

          return false;
        });
      },
    },
    getErrors: {
      value: function getErrors(includeEmptyErrors) {
        const keys = Object.keys(that);

        return keys.reduce((result, key) => {
          const subErrors = that[key].getErrors ? that[key].getErrors(includeEmptyErrors) : that[key];

          if (Object.keys(subErrors).length || includeEmptyErrors) {
            return {
              ...result,
              [key]: subErrors,
            };
          }

          return result;
        }, {});
      },
    },
    getFirstErrors: {
      value: function getFirstErrors(includeEmptyErrors) {
        const keys = Object.keys(that);

        return keys.reduce((result, key, index) => {
          const subErrors = that[key].getFirstErrors ? that[key].getFirstErrors(includeEmptyErrors) : that[key];

          if (!isString(result) && isObject(that[key]) && (Object.keys(subErrors).length || includeEmptyErrors)) {
            return {
              ...result,
              [key]: subErrors,
            };
          }

          return index === 0 ? subErrors : result;
        }, {});
      },
    },
    getErrorsAsArray: {
      value: function getErrorsAsArray(includeEmptyErrors) {
        const keys = Object.keys(that);

        return keys
          .map(key => {
            const subErrors = that[key].getErrorsAsArray ? that[key].getErrorsAsArray(includeEmptyErrors) : that[key];

            if (subErrors.length || includeEmptyErrors) {
              return subErrors;
            }

            return null;
          }, {})
          .filter(error => !!error);
      },
    },
    getFirstError: {
      value: function getFirstError(...exclude) {
        return (this.getErrorsAsArray(exclude) || [])[0];
      },
    },
  });

  return that;
}

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
function validate(schema, anything) {
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
function validateSync(schema, anything) {
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
function validateObject(obj, schema, overrides = {}) {
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
function validateObjectSync(obj, schema, overrides) {
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
function validateArray(array, schema, overrides = {}) {
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
function validateArraySync(array, schema, overrides) {
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
function validateProperty(property, obj, schema = {}, overrides = {}) {
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
function validatePropertySync(property, obj, schema, overrides) {
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
function validateValue(value, rules = {}, messages = {}, obj, property, schema) {
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
function validateValueSync(value, rules, messages, obj, property, schema) {
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
function validateRule(rule, expected, value, message, rules, messages, obj, property, schema) {
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
function validateRuleSync(rule, expected, value, message, rules, messages, obj, property, schema) {
  const promise = validateRule(rule, expected, value, message, rules, messages, obj, property, schema);

  return promise && promise.value;
}

/**
 *
 * @param schema
 * @param onlyFirstErrors
 * @returns {ngValidatorFn}
 */
function ngValidator(schema, onlyFirstErrors) {
  return function ngValidatorFn(control) {
    const validationResult = validateSync(schema, control.value);

    return onlyFirstErrors ? validationResult.getFirstErrors() : validationResult.getErrors();
  };
}

/**
 *
 * @param schema
 * @param onlyFirstErrors
 * @returns {ngAsyncValidatorFn}
 */
function ngAsyncValidator(schema, onlyFirstErrors) {
  return function ngAsyncValidatorFn(control) {
    return validate(schema, control.value).then(validationResult => {
      return onlyFirstErrors ? validationResult.getFirstErrors() : validationResult.getErrors();
    });
  };
}

/**
 *
 * @param schema
 * @param allErrors
 * @returns {reduxFormValidatorFn}
 */
function reduxFormValidator(schema, allErrors) {
  return function reduxFormValidatorFn(values) {
    const validationResult = validateSync(schema, values);

    return allErrors ? validationResult.getErrors() : validationResult.getFirstErrors();
  };
}

/**
 *
 * @param schema
 * @param allErrors
 * @returns {reduxFormAsyncValidatorFn}
 */
function reduxFormAsyncValidator(schema, allErrors) {
  return function reduxFormAsyncValidatorFn(values) {
    return validate(schema, values).then(validationResult => {
      return allErrors ? validationResult.getErrors() : validationResult.getFirstErrors();
    });
  };
}

/**
 * ValidationSchema is util class that
 *
 * @param {Object} schema -
 * @constructor
 */
function ValidationSchema(schema) {
  this._schema = schema;

  this.validate = obj => validate(schema, obj);
  this.validateSync = obj => validateSync(schema, obj);
  this.validateProperty = (property, obj) => validateProperty(property, obj, schema);
  this.validatePropertySync = (property, obj) => validatePropertySync(property, obj);
}

exports.default = validate;
exports.ValidationSchema = ValidationSchema;
exports.ValidationResult = ValidationResult;
exports.noop = noop;
exports.isType = isType;
exports.isObject = isObject;
exports.isArray = isArray;
exports.isFunction = isFunction;
exports.isString = isString;
exports.isDate = isDate;
exports.isNumber = isNumber;
exports.isBoolean = isBoolean;
exports.isEmpty = isEmpty;
exports.isNull = isNull;
exports.isUndefined = isUndefined;
exports.isNullOrUndefined = isNullOrUndefined;
exports.isDefined = isDefined;
exports.toString = toString;
exports.indexOf = indexOf;
exports.inArray = inArray;
exports.castArray = castArray;
exports.hasOwnProperty = hasOwnProperty;
exports.setPrototypeOf = setPrototypeOf;
exports.getPrototypeOf = getPrototypeOf;
exports.getProperty = getProperty;
exports.getPropertyOverride = getPropertyOverride;
exports.handlePromise = handlePromise;
exports.handlePromises = handlePromises;
exports.formatMessage = formatMessage;
exports.registerRule = registerRule;
exports.hasRule = hasRule;
exports.getRule = getRule;
exports.overrideRule = overrideRule;
exports.overrideRuleMessage = overrideRuleMessage;
exports.validate = validate;
exports.validateSync = validateSync;
exports.validateObject = validateObject;
exports.validateObjectSync = validateObjectSync;
exports.validateArray = validateArray;
exports.validateArraySync = validateArraySync;
exports.validateProperty = validateProperty;
exports.validatePropertySync = validatePropertySync;
exports.validateValue = validateValue;
exports.validateValueSync = validateValueSync;
exports.validateRule = validateRule;
exports.validateRuleSync = validateRuleSync;
exports.divisibleByRule = divisibleByRule;
exports.enumRule = enumRule;
exports.formatRule = formatRule;
exports.addFormatToFormatRule = addFormatToFormatRule;
exports.lessThanRule = lessThanRule;
exports.lessThanPropertyRule = lessThanPropertyRule;
exports.moreThanRule = moreThanRule;
exports.moreThanPropertyRule = moreThanPropertyRule;
exports.matchToRule = matchToRule;
exports.matchToPropertyRule = matchToPropertyRule;
exports.notMatchToRule = notMatchToRule;
exports.notMatchToPropertiesRule = notMatchToPropertiesRule;
exports.maxRule = maxRule;
exports.maxItemsRule = maxItemsRule;
exports.maxLengthRule = maxLengthRule;
exports.minRule = minRule;
exports.minItemsRule = minItemsRule;
exports.minLengthRule = minLengthRule;
exports.patternRule = patternRule;
exports.requiredRule = requiredRule;
exports.typeRule = typeRule;
exports.uniqueItemsRule = uniqueItemsRule;
exports.ngValidator = ngValidator;
exports.ngAsyncValidator = ngAsyncValidator;
exports.reduxFormValidator = reduxFormValidator;
exports.reduxFormAsyncValidator = reduxFormAsyncValidator;
//# sourceMappingURL=valirator.js.map
