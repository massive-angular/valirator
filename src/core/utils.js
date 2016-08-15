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
  return !(obj === undefined || obj === null);
}

export function noop() {
}

export function getObjectOverride(context, prop) {
  if (!context) {
    return false;
  }

  return isFunction(context[prop]) ? context[prop] : getObjectOverride(context.__proto__, prop);
}

export async function formatMessage(message = 'No default message for rule "%{rule}"', actual, expected, property, obj, rule) {
  var lookup = {
    actual,
    expected,
    property,
    rule
  };

  return isFunction(message)
    ? await message(actual, expected, property, obj)
    : message.replace(/%\{([a-z]+)\}/ig, function (_, match) { return lookup[match.toLowerCase()] || ''; });
}
