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

export function isDefined(obj) {
  return !(obj === undefined || obj === null || obj === '');
}

export function noop() {
}

export function getObjectOverride(context, prop) {
  if (!context) {
    return false;
  }

  return isFunction(context[prop]) ? context[prop] : getObjectOverride(context.__proto__, prop);
}

export function handlePromise(promise, resolve, reject) {
  if (promise && promise.then) {
    promise
      .then(resolve)
      .catch(reject);
  } else {
    resolve(promise);
  }
}

export function formatMessage(message = 'No default message for rule "%{rule}"', actual, expected, property, obj, rule) {
  return new Promise((resolve, reject) => {
    const lookup = {
      actual,
      expected,
      property,
      rule
    };

    const formattedMessage = isFunction(message)
      ? message(actual, expected, property, obj)
      : message.replace(/%\{([a-z]+)\}/ig, (_, match) => lookup[match.toLowerCase()] || '');

    handlePromise(formattedMessage, resolve, reject);
  });
}
