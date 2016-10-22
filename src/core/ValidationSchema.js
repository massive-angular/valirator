import { validate, validateSync, validateProperty, validatePropertySync } from './validator';

export function ValidationSchema(schema) {
  const {
    rules,
    messages,
    properties,
  } = schema;

  this.validate = (obj) => validate(schema, obj);
  this.validateSync = (obj) => validateSync(schema, obj);
  this.validateProperty = (property, obj) => validateProperty(property, obj, properties || schema, rules, messages);
  this.validatePropertySync = (property, obj) => validatePropertySync(property, obj, properties || schema, rules, messages);
}
