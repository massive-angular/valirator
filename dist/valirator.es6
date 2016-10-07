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

function isDefined(obj) {
  return !(obj === undefined || obj === null || obj === '');
}

function noop() {}

function getObjectOverride(context, prop) {
  if (!context) {
    return false;
  }

  return isFunction(context[prop]) ? context[prop] : getObjectOverride(context.__proto__, prop);
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
  var message = arguments.length <= 0 || arguments[0] === undefined ? 'No default message for rule "%{rule}"' : arguments[0];
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

var rulesHolder = {};

function registerRule(name, rule, message) {
  if (rulesHolder.hasOwnProperty(name)) {
    console.warn("[WARNING]: Trying to override defined rule '" + name + "'. Please use 'overrideRule' function instead.");
  }

  rulesHolder[name] = {
    name: name,
    message: message,
    check: rule
  };
}

function hasRule(name) {
  return rulesHolder.hasOwnProperty(name);
}

function getRule(name) {
  return rulesHolder[name] || {};
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

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
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

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function validateRule(rule, expected, value, message, rules, messages, obj, property, schema) {
  var _getRule = getRule(rule);

  var _getRule$check = _getRule.check;
  var defaultRule = _getRule$check === undefined ? noop : _getRule$check;
  var defaultMessage = _getRule.message;


  var overriddenRule = rules && (getObjectOverride(rules, rule) || rules[rule]);
  var overriddenMessage = messages && (getObjectOverride(messages, rule) || messages[rule]);

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
  var rules = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var messages = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
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
  var properties = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  var rules = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
  var messages = arguments.length <= 4 || arguments[4] === undefined ? {} : arguments[4];
  var _properties$property = properties[property];
  var _properties$property$ = _properties$property.rules;
  var propertyRules = _properties$property$ === undefined ? {} : _properties$property$;
  var _properties$property$2 = _properties$property.messages;
  var propertyMessages = _properties$property$2 === undefined ? {} : _properties$property$2;
  var propertyProperties = _properties$property.properties;


  propertyRules.__proto__ = rules;
  propertyMessages.__proto__ = messages;

  var value = obj[property];

  return validateValue(value, propertyRules, propertyMessages, obj, property, properties).then(function (valueValidationResult) {
    var errors = valueValidationResult.getErrors();

    if (propertyProperties) {
      var subValidationCallback = function subValidationCallback(result) {
        errors.__proto__ = result.getErrors();

        return new ValidationResult(errors);
      };

      if (isArray(value)) {
        return validateArray(value, propertyProperties, rules, messages).then(subValidationCallback);
      } else if (isObject(value)) {
        return validateObject(value, propertyProperties, rules, messages).then(subValidationCallback);
      }
    }

    return new ValidationResult(errors);
  });
}

function validatePropertySync(property, obj, properties, rules, messages) {
  var promise = validateProperty(property, obj, properties, rules, messages);

  return promise && promise.value;
}

function validateArray(array, properties) {
  var rules = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  var messages = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

  var promises = array.map(function (item) {
    return validateObject(item, properties, rules, messages);
  });

  return handlePromises(promises).then(function (results) {
    var errors = {};

    results.forEach(function (result, i) {
      errors[i] = result;
    });

    return new ValidationResult(errors);
  });
}

function validateArraySync(array, properties, rules, messages) {
  var promise = validateArray(array, properties, rules, messages);

  return promise && promise.value;
}

function validateObject(obj, properties) {
  var rules = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  var messages = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

  var keys = Object.keys(properties);
  var promises = keys.map(function (property) {
    return validateProperty(property, obj, properties, rules, messages);
  });

  return handlePromises(promises).then(function (results) {
    var errors = {};

    results.forEach(function (result, i) {
      errors[keys[i]] = result;
    });

    return new ValidationResult(errors);
  });
}

function validateObjectSync(obj, properties, rules, messages) {
  var promise = validateObject(obj, properties, rules, messages);

  return promise && promise.value;
}

function validate(schema, obj) {
  var rules = schema.rules;
  var messages = schema.messages;
  var properties = schema.properties;


  return validateObject(obj, properties || schema, rules, messages);
}

/**
 * Use that only in cause if you don't have any async actions.
 * Otherwise result will be undefined
 * Highly recommended to use 'validate' function instead
 * */
function validateSync(schema, obj) {
  var promise = validate(schema, obj);

  return promise && promise.value;
}

var ValidationResult = function ValidationResult() {
  var errors = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  classCallCheck(this, ValidationResult);

  return _extends({}, this, errors.__proto__, errors, {
    _invokeActionFor: function _invokeActionFor(property, action) {
      var _errors$property;

      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      return errors[property] && errors[property][action] && (_errors$property = errors[property])[action].apply(_errors$property, args);
    },
    isValid: function isValid() {
      return !this.hasErrors();
    },
    hasErrors: function hasErrors() {
      var keys = [].concat(toConsumableArray(Object.keys(errors.__proto__)), toConsumableArray(Object.keys(errors)));

      return keys.some(function (key) {
        if (errors[key].hasErrors) {
          return errors[key].hasErrors();
        }

        return errors[key];
      });
    },
    hasErrorsFor: function hasErrorsFor(property) {
      return this._invokeActionFor(property, 'hasErrors');
    },
    hasErrorsOfTypes: function hasErrorsOfTypes() {
      for (var _len2 = arguments.length, types = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        types[_key2] = arguments[_key2];
      }

      var keys = [].concat(toConsumableArray(Object.keys(errors.__proto__)), toConsumableArray(Object.keys(errors)));

      return keys.some(function (key) {
        if (types.indexOf(key) !== -1) {
          return true;
        }

        if (errors[key].hasErrorsOfTypes) {
          var _errors$key;

          return (_errors$key = errors[key]).hasErrorsOfTypes.apply(_errors$key, types);
        }

        return false;
      });
    },
    hasErrorsOfTypesFor: function hasErrorsOfTypesFor(property) {
      for (var _len3 = arguments.length, types = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        types[_key3 - 1] = arguments[_key3];
      }

      return this._invokeActionFor.apply(this, [property, 'hasErrorsOfTypes'].concat(types));
    },
    getErrors: function getErrors() {
      return _extends({}, errors);
    },
    getErrorsFor: function getErrorsFor(property) {
      return this._invokeActionFor(property, 'getErrors');
    },
    getErrorsAsArray: function getErrorsAsArray() {
      for (var _len4 = arguments.length, exclude = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        exclude[_key4] = arguments[_key4];
      }

      return Object.keys(errors).filter(function (key) {
        return exclude.indexOf(key) === -1;
      }).map(function (key) {
        return errors[key];
      });
    },
    getErrorsAsArrayFor: function getErrorsAsArrayFor(property) {
      for (var _len5 = arguments.length, exclude = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        exclude[_key5 - 1] = arguments[_key5];
      }

      return this._invokeActionFor.apply(this, [property, 'getErrorsAsArray'].concat(exclude));
    },
    getFirstError: function getFirstError() {
      for (var _len6 = arguments.length, exclude = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        exclude[_key6] = arguments[_key6];
      }

      return (this.getErrorsAsArray(exclude) || [])[0];
    },
    getFirstErrorFor: function getFirstErrorFor(property) {
      for (var _len7 = arguments.length, exclude = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
        exclude[_key7 - 1] = arguments[_key7];
      }

      return (this.getErrorsAsArrayFor.apply(this, [property].concat(exclude)) || [])[0];
    }
  });
};

var ValidationSchema = function ValidationSchema(schema) {
  classCallCheck(this, ValidationSchema);

  this.validate = validate.bind(this, schema);
  this.validateSync = validateSync.bind(this, schema);
};

function divisibleByRule(value, divisibleBy) {
  if (!isDefined(value)) {
    return true;
  }

  var multiplier = Math.max((value - Math.floor(value)).toString().length - 2, (divisibleBy - Math.floor(divisibleBy)).toString().length - 2);

  multiplier = multiplier > 0 ? Math.pow(10, multiplier) : 1;

  return value * multiplier % (divisibleBy * multiplier) === 0;
}

registerRule('divisibleBy', divisibleByRule, 'must be divisible by %{expected}');

function enumRule(value, e) {
  if (!isDefined(value)) {
    return true;
  }

  return isArray(e) && e.indexOf(value) !== -1;
}

registerRule('enum', enumRule, 'must be present in given enumerator');

var FORMATS = {
  'email': /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
  'ip-address': /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/i,
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

registerRule('format', formatRule, 'is not a valid %{expected}');

function matchToRule(value, matchTo) {
  if (!isDefined(value)) {
    return true;
  }

  return value === matchTo;
}

registerRule('matchTo', matchToRule, '%{actual} should match to %{expected}');

function matchToPropertyRule(value, matchToProperty, obj) {
  if (!isDefined(value)) {
    return true;
  }

  return value === obj[matchToProperty];
}

registerRule('matchToProperty', matchToPropertyRule, '%{actual} should match to %{expected}');

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

registerRule('notMatchTo', notMatchToRule, '%{actual} should not match to %{expected}');

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

registerRule('notMatchToProperties', notMatchToPropertiesRule, '%{actual} should not match to %{expected}');

function maxRule(value, max) {
  if (!isDefined(value)) {
    return true;
  }

  return value <= max;
}

registerRule('max', maxRule, 'must be less than or equal to %{expected}');

function maxItemsRule(value, minItems) {
  if (!isDefined(value)) {
    return true;
  }

  return isArray(value) && value.length <= minItems;
}

registerRule('maxItems', maxItemsRule, 'must contain less than %{expected} items');

function maxLengthRule(value, maxLength) {
  if (!isDefined(value)) {
    return true;
  }

  return value.length <= maxLength;
}

registerRule('maxLength', maxLengthRule, 'is too long (maximum is %{expected} characters)');

function exclusiveMaxRule(value, exclusiveMax) {
  if (!isDefined(value)) {
    return true;
  }

  return value < exclusiveMax;
}

registerRule('exclusiveMax', exclusiveMaxRule, 'must be less than %{expected}');

function minRule(value, min) {
  if (!isDefined(value)) {
    return true;
  }

  return value >= min;
}

registerRule('min', minRule, 'must be greater than or equal to %{expected}');

function minItemsRule(value, minItems) {
  if (!isDefined(value)) {
    return true;
  }

  return isArray(value) && value.length >= minItems;
}

registerRule('minItems', minItemsRule, 'must contain more than %{expected} items');

function minLengthRule(value, minLength) {
  if (!isDefined(value)) {
    return true;
  }

  return value.length >= minLength;
}

registerRule('minLength', minLengthRule, 'is too short (minimum is %{expected} characters)');

function exclusiveMinRule(value, exclusiveMin) {
  if (!isDefined(value)) {
    return true;
  }

  return value > exclusiveMin;
}

registerRule('exclusiveMin', exclusiveMinRule, 'must be greater than %{expected}');

function patternRule(value, pattern) {
  if (!isDefined(value)) {
    return true;
  }

  pattern = isString(pattern) ? new RegExp(pattern) : pattern;

  return pattern.test(value);
}

registerRule('pattern', patternRule, 'invalid input');

function requiredRule(value, required) {
  if (value) {
    return true;
  }

  if (isBoolean(required)) {
    return !required;
  }

  if (isObject(required)) {
    var allowEmpty = required.allowEmpty;
    var allowZero = required.allowZero;


    if (isBoolean(allowEmpty)) {
      return allowEmpty && value === '';
    }

    if (isBoolean(allowZero)) {
      return allowZero && value === 0;
    }
  }

  return isDefined(value);
}

registerRule('required', requiredRule, 'is required');

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

registerRule('type', typeRule, 'must be of %{expected} type');

function uniqueItemsRule(value, uniqueItems) {
  if (!isDefined(value)) {
    return true;
  }

  if (!uniqueItems) {
    return true;
  }

  var hash = {};

  for (var i = 0, l = value.length; i < l; i++) {
    var key = JSON.stringify(value[i]);
    if (hash[key]) {
      return false;
    }

    hash[key] = true;
  }

  return true;
}

registerRule('uniqueItems', uniqueItemsRule, 'must hold a unique set of values');

export { isType, isObject, isArray, isFunction, isString, isDate, isNumber, isBoolean, isDefined, noop, getObjectOverride, handlePromise, handlePromises, formatMessage, registerRule, hasRule, getRule, overrideRule, overrideRuleMessage, validateRule, validateRuleSync, validateValue, validateValueSync, validateProperty, validatePropertySync, validateArray, validateArraySync, validateObject, validateObjectSync, validate, validateSync, ValidationResult, ValidationSchema, divisibleByRule, enumRule, formatRule, matchToRule, matchToPropertyRule, notMatchToRule, notMatchToPropertiesRule, maxRule, maxItemsRule, maxLengthRule, exclusiveMaxRule, minRule, minItemsRule, minLengthRule, exclusiveMinRule, patternRule, requiredRule, typeRule, uniqueItemsRule };
//# sourceMappingURL=valirator.es6.map
