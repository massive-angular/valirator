var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();













var defineProperty = function (obj, key, value) {
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
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};













var toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

function noop() {}

function isType(obj, typeStr) {
  return Object.prototype.toString.call(obj) === typeStr;
}

function isObject(obj) {
  return isType(obj, '[object Object]');
}

function isArray(obj) {
  return isType(obj, '[object Array]');
}

function isFunction(obj) {
  return isType(obj, '[object Function]');
}

function isString(obj) {
  return isType(obj, '[object String]');
}

function isDate(obj) {
  return isType(obj, '[object Date]');
}

function isNumber(obj) {
  return isType(obj, '[object Number]') && !isNaN(obj);
}

function isBoolean(obj) {
  return isType(obj, '[object Boolean]');
}

function isEmpty(obj) {
  return obj === '' || isArray(obj) && obj.length === 0 || isObject(obj) && Object.keys(obj).length === 0;
}

function isNull(obj) {
  return isType(obj, '[object Null]');
}

function isUndefined(obj) {
  return isType(obj, '[object Undefined]');
}

function isNullOrUndefined(obj) {
  return isNull(obj) || isUndefined(obj);
}

function isDefined(obj) {
  return !(isNullOrUndefined(obj) || isEmpty(obj));
}

function toString(obj) {
  return String(obj);
}

function indexOf(array, value) {
  if (!isArray(array)) {
    return -1;
  }

  return array.indexOf(value);
}

function inArray(array, value) {
  return indexOf(array, value) !== -1;
}

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function setPrototypeOf(obj, proto) {
  if (Object.setPrototypeOf) {
    return Object.setPrototypeOf(obj, proto);
  }

  obj.__proto__ = proto;

  return obj;
}

function getPrototypeOf(obj) {
  if (Object.getPrototypeOf) {
    return Object.getPrototypeOf(obj);
  }

  return obj.__proto__;
}

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
    if (isObject(result) && hasOwnProperty(result, prop)) {
      return result[prop];
    } else {
      var _prop$split = prop.split('.'),
          _prop$split2 = toArray(_prop$split),
          first = _prop$split2[0],
          rest = _prop$split2.slice(1);

      result = result[first];
      prop = rest.join('.');
    }
  } while (prop);

  if (result === null || result === undefined) {
    return fallback;
  }

  return result;
}

function getPropertyOverride(context, prop) {
  if (!context) {
    return false;
  }

  return isFunction(context[prop]) ? context[prop] : getPropertyOverride(getPrototypeOf(context), prop);
}

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

function formatMessage() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'No default message for rule "%{rule}"';
  var actual = arguments[1];
  var expected = arguments[2];
  var property = arguments[3];
  var obj = arguments[4];
  var rule = arguments[5];

  var lookup = {
    actual: actual,
    expected: expected,
    property: property,
    rule: rule
  };

  var formattedMessage = isFunction(message) ? message(actual, expected, property, obj) : isString(message) ? message.replace(/%\{([a-z]+)\}/ig, function (_, match) {
    return lookup[match.toLowerCase()] || '';
  }) : message;

  return handlePromise(formattedMessage);
}

function divisibleByRule(value, divisibleBy) {
  if (!isDefined(value)) {
    return true;
  }

  var multiplier = Math.max(toString(value - Math.floor(value)).length - 2, toString(divisibleBy - Math.floor(divisibleBy)).length - 2);

  multiplier = multiplier > 0 ? Math.pow(10, multiplier) : 1;

  return value * multiplier % (divisibleBy * multiplier) === 0;
}

function enumRule(value, e) {
  if (!isDefined(value)) {
    return true;
  }

  return inArray(e, value);
}

var FORMATS = {
  'int': /^-?\d+$/,
  'float': /^-?\d+\.\d+$/,
  'number': /^-?\d+\.?\d*$/,
  'email': /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
  'ip': /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/i,
  'ipv6': /^([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}$/,
  'time': /^\d{2}:\d{2}:\d{2}$/,
  'date': /^\d{4}-\d{2}-\d{2}$/,
  'date-time': /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:.\d{1,3})?Z$/,
  'color': /^#[a-z0-9]{6}|#[a-z0-9]{3}|(?:rgb\(\s*(?:[+-]?\d+%?)\s*,\s*(?:[+-]?\d+%?)\s*,\s*(?:[+-]?\d+%?)\s*\))aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow$/i,
  'host-name': /^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])/,
  'url': /^(https?|ftp|git):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
  'regex': {
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

function formatRule(value, format) {
  if (!isDefined(value)) {
    return true;
  }

  if (!FORMATS[format]) {
    throw new Error('Unknown format "' + format + '"');
  }

  return FORMATS[format].test(value);
}

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

var rulesStorage = {};

function registerRule(name, rule, message) {
  if (hasOwnProperty(rulesStorage, name)) {
    console.warn('[WARNING]: Trying to override defined rule \'' + name + '\'. Please use \'overrideRule\' function instead.');
  }

  rulesStorage[name] = {
    name: name,
    message: message,
    check: rule
  };
}

function hasRule(name) {
  return hasOwnProperty(rulesStorage, name);
}

function getRule(name) {
  return rulesStorage[name] || {};
}

function overrideRule(name, rule, message) {
  if (hasRule(name)) {
    var defaultRule = getRule(name);

    defaultRule.check = rule;
    defaultRule.message = message || defaultRule.message;
  }
}

function overrideRuleMessage(name, message) {
  if (hasRule(name)) {
    var defaultRule = getRule(name);

    defaultRule.message = message;
  }
}

registerRule('divisibleBy', divisibleByRule, 'must be divisible by %{expected}');
registerRule('enum', enumRule, 'must be present in given enumerator');
registerRule('exclusiveMax', exclusiveMaxRule, 'must be less than %{expected}');
registerRule('exclusiveMin', exclusiveMinRule, 'must be greater than %{expected}');
registerRule('format', formatRule, 'is not a valid %{expected}');
registerRule('matchToProperty', matchToPropertyRule, '%{actual} should match to %{expected}');
registerRule('matchTo', matchToRule, '%{actual} should match to %{expected}');
registerRule('maxItems', maxItemsRule, 'must contain less than %{expected} items');
registerRule('maxLength', maxLengthRule, 'is too long (maximum is %{expected} characters)');
registerRule('max', maxRule, 'must be less than or equal to %{expected}');
registerRule('minItems', minItemsRule, 'must contain more than %{expected} items');
registerRule('minLength', minLengthRule, 'is too short (minimum is %{expected} characters)');
registerRule('min', minRule, 'must be greater than or equal to %{expected}');
registerRule('notMatchToProperties', notMatchToPropertiesRule, '%{actual} should not match to %{expected}');
registerRule('notMatchTo', notMatchToRule, '%{actual} should not match to %{expected}');
registerRule('pattern', patternRule, 'invalid input');
registerRule('required', requiredRule, 'is required');
registerRule('type', typeRule, 'must be of %{expected} type');
registerRule('uniqueItems', uniqueItemsRule, 'must hold a unique set of values');

function matchToRule(value, matchTo) {
  if (!isDefined(value)) {
    return true;
  }

  return value === matchTo;
}

function matchToPropertyRule(value, matchToProperty, obj) {
  if (!isDefined(value)) {
    return true;
  }

  return value === obj[matchToProperty];
}

function notMatchToRule(value, notMatchTo) {
  if (!isDefined(value)) {
    return true;
  }

  if (!isArray(notMatchTo)) {
    notMatchTo = [notMatchTo];
  }

  return notMatchTo.every(function (not) {
    return not !== value;
  });
}

function notMatchToPropertiesRule(value, notMatchToProperties, obj) {
  if (!isDefined(value)) {
    return true;
  }

  if (!isArray(notMatchToProperties)) {
    notMatchToProperties = [notMatchToProperties];
  }

  return notMatchToProperties.every(function (not) {
    return obj[not] !== value;
  });
}

function maxRule(value, max) {
  if (!isDefined(value)) {
    return true;
  }

  return value <= max;
}

function maxItemsRule(value, minItems) {
  if (!isDefined(value)) {
    return true;
  }

  return isArray(value) && value.length <= minItems;
}

function maxLengthRule(value, maxLength) {
  if (!isDefined(value)) {
    return true;
  }

  return value.length <= maxLength;
}

function exclusiveMaxRule(value, exclusiveMax) {
  if (!isDefined(value)) {
    return true;
  }

  return value < exclusiveMax;
}

function minRule(value, min) {
  if (!isDefined(value)) {
    return true;
  }

  return value >= min;
}

function minItemsRule(value, minItems) {
  if (!isDefined(value)) {
    return true;
  }

  return isArray(value) && value.length >= minItems;
}

function minLengthRule(value, minLength) {
  if (!isDefined(value)) {
    return true;
  }

  return value.length >= minLength;
}

function exclusiveMinRule(value, exclusiveMin) {
  if (!isDefined(value)) {
    return true;
  }

  return value > exclusiveMin;
}

function patternRule(value, pattern) {
  if (!isDefined(value)) {
    return true;
  }

  pattern = isString(pattern) ? new RegExp(pattern) : pattern;

  return pattern.test(value);
}

function requiredRule(value, required) {
  if (value) {
    return true;
  }

  if (isBoolean(required)) {
    return !required;
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

  return isDefined(value);
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

function ValidationResult() {
  var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var that = _extends({}, getPrototypeOf(errors), errors);

  Object.defineProperties(that, {
    isValid: {
      value: function isValid() {
        return !this.hasErrors();
      }
    },
    hasErrors: {
      value: function hasErrors() {
        var keys = Object.keys(that);

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
        for (var _len = arguments.length, types = Array(_len), _key = 0; _key < _len; _key++) {
          types[_key] = arguments[_key];
        }

        var keys = Object.keys(that);

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
        var keys = Object.keys(that);

        return keys.reduce(function (result, key) {
          var subErrors = that[key].getErrors ? that[key].getErrors(includeEmptyErrors) : that[key];

          if (Object.keys(subErrors).length || includeEmptyErrors) {
            return _extends({}, result, defineProperty({}, key, subErrors));
          }

          return result;
        }, {});
      }
    },
    getFirstErrors: {
      value: function getFirstErrors(includeEmptyErrors) {
        var keys = Object.keys(that);

        return keys.reduce(function (result, key, index) {
          var subErrors = that[key].getFirstErrors ? that[key].getFirstErrors(includeEmptyErrors) : that[key];

          if (!isString(result) && isObject(that[key]) && (Object.keys(subErrors).length || includeEmptyErrors)) {
            return _extends({}, result, defineProperty({}, key, subErrors));
          }

          return index === 0 ? subErrors : result;
        }, {});
      }
    },
    getErrorsAsArray: {
      value: function getErrorsAsArray(includeEmptyErrors) {
        var keys = Object.keys(that);

        return keys.map(function (key) {
          var subErrors = that[key].getErrorsAsArray ? that[key].getErrorsAsArray(includeEmptyErrors) : that[key];

          if (subErrors.length || includeEmptyErrors) {
            return subErrors;
          }

          return null;
        }, {}).filter(function (error) {
          return !!error;
        });
      }
    },
    getFirstError: {
      value: function getFirstError() {
        for (var _len2 = arguments.length, exclude = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          exclude[_key2] = arguments[_key2];
        }

        return (this.getErrorsAsArray(exclude) || [])[0];
      }
    }
  });

  return that;
}

function validateRule(rule, expected, value, message, rules, messages, obj, property, schema) {
  var _getRule = getRule(rule),
      _getRule$check = _getRule.check,
      defaultRule = _getRule$check === undefined ? noop : _getRule$check,
      defaultMessage = _getRule.message;

  var overriddenRule = rules && (getPropertyOverride(rules, rule) || rules[rule]);
  var overriddenMessage = messages && (getPropertyOverride(messages, rule) || messages[rule]);

  var isValid = (isFunction(overriddenRule) ? overriddenRule : defaultRule)(value, expected, obj, property, schema, defaultRule);

  return handlePromise(isValid).then(function (result) {
    if (isString(result)) {
      return result;
    } else if (result !== true) {
      return formatMessage(overriddenMessage || message || defaultMessage, value, expected, property, obj, rule);
    }
  });
}

function validateRuleSync(rule, expected, value, message, rules, messages, obj, property, schema) {
  var promise = validateRule(rule, expected, value, message, rules, messages, obj, property, schema);

  return promise && promise.value;
}

function validateValue(value) {
  var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var messages = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var obj = arguments[3];
  var property = arguments[4];
  var schema = arguments[5];

  var keys = Object.keys(rules);
  var promises = keys.map(function (rule) {
    var expected = rules[rule];
    var message = messages[rule];

    return validateRule(rule, expected, value, message, rules, messages, obj, property, schema);
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

function validateValueSync(value, rules, messages, obj, property, schema) {
  var promise = validateValue(value, rules, messages, obj, property, schema);

  return promise && promise.value;
}

function validateProperty(property, obj) {
  var schema = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var overrides = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var propertyValue = getProperty(schema, property, {});
  var __isArray__ = propertyValue.__isArray__,
      propertyRules = propertyValue.rules,
      _propertyValue$messag = propertyValue.messages,
      propertyMessages = _propertyValue$messag === undefined ? {} : _propertyValue$messag,
      _propertyValue$overri = propertyValue.overrides,
      propertyOverrides = _propertyValue$overri === undefined ? {} : _propertyValue$overri,
      propertyProperties = propertyValue.properties;
  var _overrides$rules = overrides.rules,
      overriddenRules = _overrides$rules === undefined ? {} : _overrides$rules,
      _overrides$messages = overrides.messages,
      overriddenMessages = _overrides$messages === undefined ? {} : _overrides$messages;


  if (!isDefined(property) && !isDefined(propertyProperties)) {
    propertyProperties = propertyValue;
  } else if (!isDefined(propertyRules)) {
    if (!propertyValue.messages && !propertyValue.properties && !propertyValue.overrides) {
      propertyRules = propertyValue;
    }
  }

  if (!isDefined(propertyRules)) {
    propertyRules = {};
  }

  setPrototypeOf(propertyOverrides, overrides);
  setPrototypeOf(propertyRules, overriddenRules);
  setPrototypeOf(propertyMessages, overriddenMessages);

  var value = getProperty(obj, property);

  return validateValue(value, propertyRules, propertyMessages, obj, property, schema).then(function (valueValidationResult) {
    if (propertyProperties) {
      var subValidationCallback = function subValidationCallback(subValidationResult) {
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

function validatePropertySync(property, obj, schema, overrides) {
  var promise = validateProperty(property, obj, schema, overrides);

  return promise && promise.value;
}

function validateArray(array, schema) {
  var overrides = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var promises = (array || []).map(function (item) {
    return validateObject(item, schema, overrides);
  });

  return handlePromises(promises).then(function (results) {
    var errors = {};

    results.forEach(function (result, i) {
      errors[i] = result;
    });

    return new ValidationResult(errors);
  });
}

function validateArraySync(array, schema, overrides) {
  var promise = validateArray(array, schema, overrides);

  return promise && promise.value;
}

function validateObject(obj, schema) {
  var overrides = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var keys = Object.keys(schema);
  var promises = keys.map(function (property) {
    return validateProperty(property, obj, schema, overrides);
  });

  return handlePromises(promises).then(function (results) {
    var errors = {};

    results.forEach(function (result, i) {
      errors[keys[i]] = result;
    });

    return new ValidationResult(errors);
  });
}

function validateObjectSync(obj, schema, overrides) {
  var promise = validateObject(obj, schema, overrides);

  return promise && promise.value;
}

function validate(schema, obj) {
  return validateProperty(undefined, obj, schema);
}

function validateSync(schema, obj) {
  var promise = validate(schema, obj);

  return promise && promise.value;
}

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

function ngValidator(schema, onlyFirstErrors) {
  return function validatorFn(control) {
    var validationResult = validateSync(schema, control.value);

    return onlyFirstErrors ? validationResult.getFirstErrors() : validationResult.getErrors();
  };
}

function ngAsyncValidator(schema, onlyFirstErrors) {
  return function asyncValidatorFn(control) {
    return validate(schema, control.value).then(function (validationResult) {
      return onlyFirstErrors ? validationResult.getFirstErrors() : validationResult.getErrors();
    });
  };
}

function reduxFormValidator(schema, allErrors) {
  return function validatorFn(values) {
    var validationResult = validateSync(schema, values);

    return allErrors ? validationResult.getErrors() : validationResult.getFirstErrors();
  };
}

function reduxFormAsyncValidator(schema, allErrors) {
  return function asyncValidatorFn(values) {
    return validate(schema, values).then(function (validationResult) {
      return allErrors ? validationResult.getErrors() : validationResult.getFirstErrors();
    });
  };
}

export { ValidationSchema, ValidationResult, noop, isType, isObject, isArray, isFunction, isString, isDate, isNumber, isBoolean, isEmpty, isNull, isUndefined, isNullOrUndefined, isDefined, toString, indexOf, inArray, hasOwnProperty, setPrototypeOf, getPrototypeOf, getProperty, getPropertyOverride, handlePromise, handlePromises, formatMessage, divisibleByRule, enumRule, formatRule, matchToRule, matchToPropertyRule, notMatchToRule, notMatchToPropertiesRule, maxRule, maxItemsRule, maxLengthRule, exclusiveMaxRule, minRule, minItemsRule, minLengthRule, exclusiveMinRule, patternRule, requiredRule, typeRule, uniqueItemsRule, addFormatToFormatRule, registerRule, hasRule, getRule, overrideRule, overrideRuleMessage, validateRule, validateRuleSync, validateValue, validateValueSync, validateProperty, validatePropertySync, validateArray, validateArraySync, validateObject, validateObjectSync, validate, validateSync, ngValidator, ngAsyncValidator, reduxFormValidator, reduxFormAsyncValidator };
//# sourceMappingURL=valirator.es6.map
