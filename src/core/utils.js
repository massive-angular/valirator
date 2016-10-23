export function noop() {
}

export function isType(obj, typeStr) {
  return (Object.prototype.toString.call(obj) === typeStr);
}

export function isObject(obj) {
  return isType(obj, '[object Object]');
}

export function isArray(obj) {
  return isType(obj, '[object Array]');
}

export function isFunction(obj) {
  return isType(obj, '[object Function]');
}

export function isString(obj) {
  return isType(obj, '[object String]');
}

export function isDate(obj) {
  return isType(obj, '[object Date]');
}

export function isNumber(obj) {
  return isType(obj, '[object Number]') && !isNaN(obj);
}

export function isBoolean(obj) {
  return isType(obj, '[object Boolean]');
}

export function isEmpty(obj) {
  return obj === '' || (isArray(obj) && obj.length === 0) || (isObject(obj) && Object.keys(obj).length === 0);
}

export function isNull(obj) {
  return isType(obj, '[object Null]');
}

export function isUndefined(obj) {
  return isType(obj, '[object Undefined]');
}

export function isNullOrUndefined(obj) {
  return isNull(obj) || isUndefined(obj);
}

export function isDefined(obj) {
  return !(isNullOrUndefined(obj) || isEmpty(obj));
}

export function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function setPrototypeOf(obj, proto) {
  if (Object.setPrototypeOf) {
    return Object.setPrototypeOf(obj, proto);
  }

  obj.__proto__ = proto;

  return obj;
}

export function getPrototypeOf(obj) {
  if (Object.getPrototypeOf) {
    return Object.getPrototypeOf(obj);
  }

  return obj.__proto__;
}

export function getProperty(obj, path, fallback = null) {
  let result = obj;
  let prop = path;

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

export function getPropertyOverride(context, prop) {
  if (!context) {
    return false;
  }

  return isFunction(context[prop]) ? context[prop] : getPropertyOverride(getPrototypeOf(context), prop);
}

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

export function handlePromises(promises) {
  const isAnyPromiseNotPromiseLike = promises.some(promise => promise && promise.then && !promise.isPromiseLike);
  if (isAnyPromiseNotPromiseLike) {
    return Promise.all(promises);
  }

  const results = promises.map(promise => promise.value);

  return handlePromise(results);
}

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
