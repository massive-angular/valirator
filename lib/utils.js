/**
 * @description
 * Empty function
 */
export function noop() {
}

/**
 * @description
 * Check if type
 *
 * @param obj
 * @param {string} typeStr - type string like: '[object Object]', '[object Array]' and etc
 * @returns {boolean}
 */
export function isType(obj, typeStr) {
  return (Object.prototype.toString.call(obj) === typeStr);
}

/**
 * @description
 * Check if is Object
 *
 * @param obj
 * @returns {boolean}
 */
export function isObject(obj) {
  return isType(obj, '[object Object]');
}

/**
 * @description
 * Check if is Array
 *
 * @param obj
 * @returns {boolean}
 */
export function isArray(obj) {
  return isType(obj, '[object Array]');
}

/**
 * @description
 * Check if is Function
 *
 * @param obj
 * @returns {boolean}
 */
export function isFunction(obj) {
  return isType(obj, '[object Function]');
}

/**
 * @description
 * Check if is String
 *
 * @param obj
 * @returns {boolean}
 */
export function isString(obj) {
  return isType(obj, '[object String]');
}

/**
 * @description
 * Check if is Date
 *
 * @param obj
 * @returns {boolean}
 */
export function isDate(obj) {
  return isType(obj, '[object Date]');
}

/**
 * @description
 * Check if is Number
 *
 * @param obj
 * @returns {boolean}
 */
export function isNumber(obj) {
  return isType(obj, '[object Number]') && !isNaN(obj);
}

/**
 * @description
 * Check if is Boolean
 *
 * @param obj
 * @returns {boolean}
 */
export function isBoolean(obj) {
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
export function isEmpty(obj) {
  return obj === '' || (isArray(obj) && obj.length === 0) || (isObject(obj) && Object.keys(obj).length === 0);
}

/**
 * @description
 * Check if is Null
 *
 * @param obj
 * @returns {boolean}
 */
export function isNull(obj) {
  return isType(obj, '[object Null]');
}

/**
 * @description
 * Check if is Undefined
 *
 * @param obj
 * @returns {boolean}
 */
export function isUndefined(obj) {
  return isType(obj, '[object Undefined]');
}

/**
 * @description
 * Check is is Null or Undefined
 *
 * @param obj
 * @returns {boolean}
 */
export function isNullOrUndefined(obj) {
  return isNull(obj) || isUndefined(obj);
}

/**
 * @description
 * Check is object is defined (not null, not undefined, not empty string, object or array
 *
 * @param obj
 * @returns {boolean}
 */
export function isDefined(obj) {
  return !(isNullOrUndefined(obj) || isEmpty(obj));
}

/**
 * @description
 * Safe convert to String
 *
 * @param obj
 * @returns {string}
 */
export function toString(obj) {
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
export function indexOf(array, value) {
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
export function inArray(array, value) {
  return isArray(array) && indexOf(array, value) !== -1;
}

/**
 * @description
 * Safe check is object has property
 *
 * @param obj
 * @param {string} prop - property name
 * @returns {boolean}
 */
export function hasOwnProperty(obj, prop) {
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
export function setPrototypeOf(obj, proto) {
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
export function getPrototypeOf(obj) {
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
export function getProperty(obj, path = '', fallback = null) {
  let result = obj;
  let prop = toString(path);

  if (path === '') {
    return result;
  }

  if (!isDefined(obj)) {
    return fallback;
  }

  do {
    if (isObject(result) && hasOwnProperty(result, prop)) {
      return result[prop];
    } else {
      const [first, ...rest] = prop.split('.');

      result = result[first];
      prop = rest.join('.');
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
export function getPropertyOverride(context, prop) {
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
export function handlePromise(promise) {
  if (promise && promise.then) {
    return promise;
  }

  return {
    then: (cb) => handlePromise(cb(promise)),
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
export function handlePromises(promises) {
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
export function formatMessage(message = 'No default message for rule "%{rule}"', actual, expected, property, obj, rule) {
  const lookup = {
    actual,
    expected,
    property,
    rule
  };

  const formattedMessage = isFunction(message)
    ? message(actual, expected, property, obj)
    : (isString(message) ? message.replace(/%\{([a-z]+)\}/ig, (_, match) => lookup[match.toLowerCase()] || '') : message);

  return handlePromise(formattedMessage);
}

/**
 * @typedef {Object} PromiseLike
 * @property {Function} then
 * @property {Function} catch
 * @property {*} value
 * @property {boolean} isPromiseLike
 */
