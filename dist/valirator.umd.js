(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.valirator = {}));
}(this, function (exports) { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

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
    return obj === '' || isArray(obj) && obj.length === 0 || isObject(obj) && Object.keys(obj).length === 0;
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

  function getProperty(obj) {
    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var result = obj;
    var prop = toString(path);

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

        var _prop$split = prop.split('.'),
            _prop$split2 = _toArray(_prop$split),
            first = _prop$split2[0],
            rest = _prop$split2.slice(1);

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
      then: function then(cb) {
        return handlePromise(cb(promise));
      },
      catch: noop,
      value: promise,
      isPromiseLike: true
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
    var isAnyPromiseNotPromiseLike = promises.some(function (promise) {
      return promise && promise.then && !promise.isPromiseLike;
    });

    if (isAnyPromiseNotPromiseLike) {
      return Promise.all(promises);
    }

    var results = promises.map(function (promise) {
      return promise.value;
    });
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

  function formatMessage() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'No default message for rule "%{rule}"';
    var actual = arguments.length > 1 ? arguments[1] : undefined;
    var expected = arguments.length > 2 ? arguments[2] : undefined;
    var property = arguments.length > 3 ? arguments[3] : undefined;
    var obj = arguments.length > 4 ? arguments[4] : undefined;
    var rule = arguments.length > 5 ? arguments[5] : undefined;
    var lookup = {
      actual: actual,
      expected: expected,
      property: property,
      rule: rule
    };
    var formattedMessage = isFunction(message) ? message(actual, expected, property, obj) : isString(message) ? message.replace(/%\{([a-z]+)\}/gi, function (_, match) {
      return lookup[match.toLowerCase()] || '';
    }) : message;
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

    var multiplier = Math.max(toString(value - Math.floor(value)).length - 2, toString(divisibleBy - Math.floor(divisibleBy)).length - 2);
    multiplier = multiplier > 0 ? Math.pow(10, multiplier) : 1;
    return value * multiplier % (divisibleBy * multiplier) === 0;
  }
  divisibleByRule.ruleName = 'divisibleBy';
  divisibleByRule.defaultMessage = 'must be divisible by %{expected}';

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
  enumRule.ruleName = 'enum';
  enumRule.defaultMessage = 'must be present in given enumerator';

  /* eslint-disable no-control-regex,no-useless-escape */
  var FORMATS = {
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
          new RegExp(value);
        } catch (e) {
          return false;
        }

        return true;
      }
    }
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
      throw new Error("Unknown format \"".concat(format, "\""));
    }

    return FORMATS[format].test(value);
  }
  formatRule.ruleName = 'format';
  formatRule.defaultMessage = 'is not a valid %{expected}';
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
        test: format
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
  lessThanRule.ruleName = 'lessThan';
  lessThanRule.defaultMessage = 'must be less than %{expected}';

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
  lessThanPropertyRule.ruleName = 'lessThanProperty';
  lessThanPropertyRule.defaultMessage = 'must be less than %{expected}';

  /**
   *
   * @param value
   * @param moreThan
   * @returns {boolean}
   */
  function moreThanRule(value, moreThan) {
    return value > moreThan;
  }
  moreThanRule.ruleName = 'moreThan';
  moreThanRule.defaultMessage = 'must be greater than %{expected}';

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
  moreThanPropertyRule.ruleName = 'moreThanProperty';
  moreThanPropertyRule.defaultMessage = 'must be greater than %{expected}';

  /**
   *
   * @param value
   * @param matchTo
   * @returns {boolean}
   */
  function matchToRule(value, matchTo) {
    return value === matchTo;
  }
  matchToRule.ruleName = 'matchTo';
  matchToRule.defaultMessage = 'should match to %{expected}';

  /**
   *
   * @param value
   * @param matchToProperty
   * @param obj
   * @returns {boolean}
   */

  function matchToPropertyRule(value, matchToProperty, obj) {
    return castArray(matchToProperty).every(function (to) {
      return obj[to] === value;
    });
  }
  matchToPropertyRule.ruleName = ['matchToProperty', 'matchToProperties'];
  matchToPropertyRule.defaultMessage = 'should match to %{expected}';

  /**
   *
   * @param value
   * @param notMatchTo
   * @returns {*}
   */

  function notMatchToRule(value, notMatchTo) {
    return castArray(notMatchTo).every(function (not) {
      return not !== value;
    });
  }
  notMatchToRule.ruleName = 'notMatchTo';
  notMatchToRule.defaultMessage = 'should not match to %{expected}';

  /**
   *
   * @param value
   * @param notMatchToProperty
   * @param obj
   * @returns {*}
   */

  function notMatchToPropertyRule(value, notMatchToProperty, obj) {
    return castArray(notMatchToProperty).every(function (not) {
      return obj[not] !== value;
    });
  }
  notMatchToPropertyRule.ruleName = ['notMatchToProperty', 'notMatchToProperties'];
  notMatchToPropertyRule.defaultMessage = 'should not match to %{expected}';

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
  maxRule.ruleName = 'max';
  maxRule.defaultMessage = 'must be less than or equal to %{expected}';

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
  maxItemsRule.ruleName = 'maxItems';
  maxItemsRule.defaultMessage = 'must contain less than %{expected} items';

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
  maxLengthRule.ruleName = 'maxLength';
  maxLengthRule.defaultMessage = 'is too long (maximum is %{expected} characters)';

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
  minRule.ruleName = 'min';
  minRule.defaultMessage = 'must be greater than or equal to %{expected}';

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
  minItemsRule.ruleName = 'minItems';
  minItemsRule.defaultMessage = 'must contain more than %{expected} items';

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
  minLengthRule.ruleName = 'minLength';
  minLengthRule.defaultMessage = 'is too short (minimum is %{expected} characters)';

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

    patterns = castArray(patterns).map(function (pattern) {
      return isString(pattern) ? new RegExp(pattern) : pattern;
    });
    return patterns.every(function (pattern) {
      return pattern.test(value);
    });
  }
  patternRule.ruleName = 'pattern';
  patternRule.defaultMessage = 'invalid input';

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
      var allowEmpty = required.allowEmpty,
          allowZero = required.allowZero;

      if (isBoolean(allowEmpty)) {
        return allowEmpty && value === '';
      }

      if (isBoolean(allowZero)) {
        return allowZero && value === 0;
      }
    }

    return !!value && isDefined(value);
  }
  requiredRule.ruleName = 'required';
  requiredRule.defaultMessage = 'is required';

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

    var types = type;

    if (!Array.isArray(type)) {
      types = [type];
    }

    return types.some(function (type) {
      return checkValueType(value, type);
    });
  }
  typeRule.ruleName = 'type';
  typeRule.defaultMessage = 'must be of %{expected} type';

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

    var hash = {};
    var i = 0,
        ln = value.length;

    for (; i < ln; i++) {
      var key = JSON.stringify(value[i]);

      if (hash[key]) {
        return false;
      }

      hash[key] = true;
    }

    return true;
  }
  uniqueItemsRule.ruleName = 'uniqueItems';
  uniqueItemsRule.defaultMessage = 'must hold an unique set of values';



  var rules = /*#__PURE__*/Object.freeze({
    divisibleByRule: divisibleByRule,
    enumRule: enumRule,
    formatRule: formatRule,
    addFormatToFormatRule: addFormatToFormatRule,
    lessThanRule: lessThanRule,
    lessThanPropertyRule: lessThanPropertyRule,
    moreThanRule: moreThanRule,
    moreThanPropertyRule: moreThanPropertyRule,
    matchToRule: matchToRule,
    matchToPropertyRule: matchToPropertyRule,
    notMatchToRule: notMatchToRule,
    notMatchToPropertyRule: notMatchToPropertyRule,
    maxRule: maxRule,
    maxItemsRule: maxItemsRule,
    maxLengthRule: maxLengthRule,
    minRule: minRule,
    minItemsRule: minItemsRule,
    minLengthRule: minLengthRule,
    patternRule: patternRule,
    requiredRule: requiredRule,
    typeRule: typeRule,
    uniqueItemsRule: uniqueItemsRule
  });

  var rulesStorage = {};
  /**
   * Register validation rule
   *
   * @param {string} name - rule name
   * @param {Function} rule - rule function
   * @param {string|Function} message - rule message
   */

  function registerRule(name, rule, message) {
    if (hasOwnProperty(rulesStorage, name)) {
      console.warn("[WARNING]: Trying to override defined rule '".concat(name, "'. Please use 'overrideRule' function instead."));
    }

    rulesStorage[name] = {
      name: name,
      message: message,
      check: rule
    };
  }
  /**
   * Register batch validation rule
   *
   * @param {Array} rules - rules to register
   */

  function registerRules(rules) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = rules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var rule = _step.value;

        if (rule && rule.ruleName) {
          var ruleNames = castArray(rule.ruleName);
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = ruleNames[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var ruleName = _step2.value;
              registerRule(ruleName, rule, rule.defaultMessage);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
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
      var defaultRule = getRule(name);
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
      var defaultRule = getRule(name);
      defaultRule.message = message;
    }
  }
  registerRules(Object.values(rules));

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

  function ValidationResult() {
    var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var protoOfErrors = getPrototypeOf(errors);

    var that = _objectSpread2({}, protoOfErrors, {}, errors);

    var keys = [].concat(_toConsumableArray(Object.keys(errors)), _toConsumableArray(Object.keys(protoOfErrors)));
    Object.defineProperties(that, {
      isValid: {
        value: function isValid() {
          return !this.hasErrors();
        }
      },
      hasErrors: {
        value: function hasErrors() {
          return keys.some(function (key) {
            if (that[key].hasErrors) {
              return that[key].hasErrors();
            }

            return that[key];
          });
        }
      },
      hasErrorsOfTypes: {
        value: function hasErrorsOfTypes() {
          for (var _len = arguments.length, types = new Array(_len), _key = 0; _key < _len; _key++) {
            types[_key] = arguments[_key];
          }

          return keys.some(function (key) {
            if (types.indexOf(key) !== -1) {
              return true;
            }

            if (that[key].hasErrorsOfTypes) {
              var _that$key;

              return (_that$key = that[key]).hasErrorsOfTypes.apply(_that$key, types);
            }

            return false;
          });
        }
      },
      getErrors: {
        value: function getErrors(includeEmptyErrors) {
          return keys.reduce(function (result, key) {
            var subErrors = that[key].getErrors ? that[key].getErrors(includeEmptyErrors) : that[key];

            if (Object.keys(subErrors).length || includeEmptyErrors) {
              return _objectSpread2({}, result, _defineProperty({}, key, subErrors));
            }

            return result;
          }, {});
        }
      },
      getFirstErrors: {
        value: function getFirstErrors(includeEmptyErrors) {
          return keys.reduce(function (result, key, index) {
            var subErrors = that[key].getFirstErrors ? that[key].getFirstErrors(includeEmptyErrors) : that[key];

            if (!isString(result) && isObject(that[key]) && (Object.keys(subErrors).length || includeEmptyErrors)) {
              return _objectSpread2({}, result, _defineProperty({}, key, subErrors));
            }

            return index === 0 ? subErrors : result;
          }, {});
        }
      },
      getErrorsAsArray: {
        value: function getErrorsAsArray(includeEmptyErrors) {
          return keys.map(function (key) {
            var subErrors = that[key].getErrorsAsArray ? that[key].getErrorsAsArray(includeEmptyErrors) : that[key];

            if (subErrors.length || includeEmptyErrors) {
              return subErrors;
            }

            return null;
          }, {}).filter(function (error) {
            return isDefined(error);
          });
        }
      },
      getFirstError: {
        value: function getFirstError() {
          for (var _len2 = arguments.length, exclude = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            exclude[_key2] = arguments[_key2];
          }

          return (this.getErrorsAsArray(exclude) || [])[0];
        }
      }
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
    return handlePromise(isFunction(schema) ? schema(anything) : schema).then(function (builtSchema) {
      return validateProperty(undefined, anything, builtSchema);
    });
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
    var promise = validate(isFunction(schema) ? schema(anything) : schema, anything);
    return promise && promise.value;
  }
  /**
   *
   * @param obj
   * @param schema
   * @param overrides
   * @returns {Promise<ValidationResult>}
   */

  function validateObject(obj, schema) {
    var overrides = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var initial = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : obj;
    var keys = Object.keys(schema);
    var promises = keys.map(function (property) {
      return validateProperty(property, obj, schema, overrides, initial);
    });
    return handlePromises(promises).then(function (results) {
      var errors = {};
      results.forEach(function (result, i) {
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
    var initial = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : obj;
    var promise = validateObject(obj, schema, overrides, initial);
    return promise && promise.value;
  }
  /**
   *
   * @param array
   * @param schema
   * @param overrides
   * @returns {Promise<ValidationResult>}
   */

  function validateArray(array, schema) {
    var overrides = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var initial = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : array;
    var promises = (array || []).map(function (item) {
      return validateObject(item, schema, overrides, initial);
    });
    return handlePromises(promises).then(function (results) {
      var errors = {};
      results.forEach(function (result, i) {
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
    var initial = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : array;
    var promise = validateArray(array, schema, overrides, initial);
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

  function validateProperty(property, obj) {
    var schema = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var overrides = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var initial = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : obj;
    var propertyValue = getProperty(schema, property, {});
    var __isArray__ = propertyValue.__isArray__,
        propertyRules = propertyValue.rules,
        _propertyValue$messag = propertyValue.messages,
        propertyMessages = _propertyValue$messag === void 0 ? {} : _propertyValue$messag,
        _propertyValue$overri = propertyValue.overrides,
        propertyOverrides = _propertyValue$overri === void 0 ? {} : _propertyValue$overri,
        propertyProperties = propertyValue.properties;
    var _overrides$rules = overrides.rules,
        overriddenRules = _overrides$rules === void 0 ? {} : _overrides$rules,
        _overrides$messages = overrides.messages,
        overriddenMessages = _overrides$messages === void 0 ? {} : _overrides$messages;

    if (!propertyRules && !propertyProperties) {
      var propertyKeys = Object.keys(propertyValue);
      var hasRuleProperty = propertyKeys.some(function (key) {
        return hasRule(key) || hasOwnProperty(overriddenRules, key) || isFunction(propertyValue[key]);
      });

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
    var value = getProperty(obj, property);
    return validateValue(value, propertyRules, propertyMessages, obj, property, schema, initial).then(function (valueValidationResult) {
      if (propertyProperties) {
        var subValidationCallback = function subValidationCallback(subValidationResult) {
          setPrototypeOf(valueValidationResult, subValidationResult);
          return new ValidationResult(valueValidationResult);
        };

        if (isArray(value) || __isArray__) {
          return validateArray(value, propertyProperties, propertyOverrides, initial).then(subValidationCallback);
        } else {
          return validateObject(value, propertyProperties, propertyOverrides, initial).then(subValidationCallback);
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
    var promise = validateProperty(property, obj, schema, overrides);
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

  function validateValue(value) {
    var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var messages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var obj = arguments.length > 3 ? arguments[3] : undefined;
    var property = arguments.length > 4 ? arguments[4] : undefined;
    var schema = arguments.length > 5 ? arguments[5] : undefined;
    var initial = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : obj;
    var keys = Object.keys(rules);
    var promises = keys.map(function (rule) {
      var expected = rules[rule];
      var message = messages[rule];
      return validateRule(rule, expected, value, message, rules, messages, obj, property, schema, initial);
    });
    return handlePromises(promises).then(function (results) {
      var errors = {};
      results.forEach(function (result, i) {
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
    var promise = validateValue(value, rules, messages, obj, property, schema);
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
    var initial = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : obj;

    var _getRule = getRule(rule),
        _getRule$check = _getRule.check,
        defaultRule = _getRule$check === void 0 ? noop : _getRule$check,
        defaultMessage = _getRule.message;

    var overriddenRule = rules && (getPropertyOverride(rules, rule) || rules[rule]);
    var overriddenMessage = messages && (getPropertyOverride(messages, rule) || messages[rule]);
    var ruleFn = isFunction(overriddenRule) ? overriddenRule : defaultRule;
    var ruleMsg = overriddenMessage || message || defaultMessage;
    var expects = castArray(expected);
    var validations = expects.map(function (exp) {
      return handlePromise(ruleFn(value, exp, obj, property, schema, defaultRule, initial));
    });
    return handlePromises(validations).then(function (results) {
      var hasValidResult = results.some(function (result) {
        return result === true;
      });

      if (!hasValidResult) {
        var result = results.find(function (result) {
          return result !== true;
        });

        if (isString(result)) {
          return result;
        } else if (result !== true) {
          return formatMessage(ruleMsg, value, expects.join(', '), getProperty(schema, "".concat(property, ".alias")) || property, obj, rule);
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
    var promise = validateRule(rule, expected, value, message, rules, messages, obj, property, schema);
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
      var validationResult = validateSync(schema, control.value);
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
      return validate(schema, control.value).then(function (validationResult) {
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
      var validationResult = validateSync(schema, values);
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
      return validate(schema, values).then(function (validationResult) {
        return allErrors ? validationResult.getErrors() : validationResult.getFirstErrors();
      });
    };
  }



  var index = /*#__PURE__*/Object.freeze({
    ngValidator: ngValidator,
    ngAsyncValidator: ngAsyncValidator,
    reduxFormValidator: reduxFormValidator,
    reduxFormAsyncValidator: reduxFormAsyncValidator
  });

  /**
   * ValidationSchema is util class that
   *
   * @param {Object} schema -
   * @constructor
   */

  function ValidationSchema(schema) {
    this._schema = schema;

    this.validate = function (obj) {
      return validate(schema, obj);
    };

    this.validateSync = function (obj) {
      return validateSync(schema, obj);
    };

    this.validateProperty = function (property, obj) {
      return validateProperty(property, obj, schema);
    };

    this.validatePropertySync = function (property, obj) {
      return validatePropertySync(property, obj);
    };
  }

  exports.ValidationResult = ValidationResult;
  exports.ValidationSchema = ValidationSchema;
  exports.default = validate;
  exports.getRule = getRule;
  exports.hasRule = hasRule;
  exports.libs = index;
  exports.overrideRule = overrideRule;
  exports.overrideRuleMessage = overrideRuleMessage;
  exports.registerRule = registerRule;
  exports.registerRules = registerRules;
  exports.rules = rules;
  exports.validate = validate;
  exports.validateArray = validateArray;
  exports.validateArraySync = validateArraySync;
  exports.validateObject = validateObject;
  exports.validateObjectSync = validateObjectSync;
  exports.validateProperty = validateProperty;
  exports.validatePropertySync = validatePropertySync;
  exports.validateRule = validateRule;
  exports.validateRuleSync = validateRuleSync;
  exports.validateSync = validateSync;
  exports.validateValue = validateValue;
  exports.validateValueSync = validateValueSync;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=valirator.umd.js.map
