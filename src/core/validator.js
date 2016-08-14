import { getRule } from './rules';
import { isFunction, isObject, isArray, noop, getObjectOverride, formatMessage } from './utils';

async function checkRule(obj, property, schema, schemaRules, schemaMessages, errors, rule) {
  const {
    check: defaultRule,
    message: defaultMessage
  } = getRule(rule);

  const actual = obj[property];
  const expected = schemaRules[rule];
  const schemaRule = getObjectOverride(schemaRules, rule) || schemaRules[rule];
  const schemaMessage = getObjectOverride(schemaMessages, rule) || schemaMessages[rule];

  const isValid = await (isFunction(schemaRule) ? schemaRule : defaultRule || noop)(actual, expected, property, obj, schema, defaultRule);

  if (isValid !== true) {
    errors[rule] = await formatMessage(schemaMessage || defaultMessage, actual, expected, property, obj, rule);
  }

  const {
    properties: subSchemaProperties
  }  = schema[property];

  if (subSchemaProperties) {
    if (isObject(actual)) {
      await validateSchema(actual, subSchemaProperties, schemaRules, schemaMessages, errors);
    } else if (isArray(actual)) {
      actual.map(async (item, i) => {
        return await validateSchema(item, subSchemaProperties, schemaRules, schemaMessages, errors[i] || (errors[i] = {}));
      });
    }
  }

  return errors;
}

async function checkProperty(obj, schema, schemaRules, schemaMessages, errors, property) {
  const {
    rules: propertyRules = {},
    messages: propertyMessages = {}
  } = schema[property];

  propertyRules.__proto__ = schemaRules;
  propertyMessages.__proto__ = schemaMessages;

  for (const rule in propertyRules) {
    if (propertyRules.hasOwnProperty(rule)) {
      await checkRule(obj, property, schema, propertyRules, propertyMessages, errors[property] || (errors[property] = {}), rule);
    }
  }

  return errors;
}

async function validateSchema(obj, schemaProperties, schemaRules, schemaMessages, errors) {
  for (const property in schemaProperties) {
    if (schemaProperties.hasOwnProperty(property)) {
      await checkProperty(obj, schemaProperties, schemaRules, schemaMessages, errors, property);
    }
  }

  return errors;
}

export async function validate(obj, schema) {
  const {
    rules: schemaRules = {},
    messages: schemaMessages = {},
    properties: schemaProperties = {},
  } = schema;

  return await validateSchema(obj, schemaProperties, schemaRules, schemaMessages, {});
}
